import { resolve } from "../Util/KeyPathUtil"
import { assertUnreachable } from "../Util/Util"
import { constant, mapContextualFormulas, mapFormulas } from "./internal"
import { CommutativeMonoidOperation, ComputeNode, ConstantNode, Data, Node, Operation, StringNode } from "./type"

const allCommutativeMonoidOperations: StrictDict<CommutativeMonoidOperation, (_: number[]) => number> = {
  min: (x: number[]): number => Math.min(...x),
  max: (x: number[]): number => Math.max(...x),
  add: (x: number[]): number => x.reduce((a, b) => a + b, 0),
  mul: (x: number[]): number => x.reduce((a, b) => a * b, 1),
}
export const allOperations: StrictDict<Exclude<Node["operation"], "const" | "read" | "input" | "subscript">, (_: number[]) => number> = {
  ...allCommutativeMonoidOperations,
  res: ([res]: number[]): number => {
    if (res < 0) return 1 - res / 2
    else if (res >= 0.75) return 1 / (res * 4 + 1)
    return 1 - res
  },
  sum_frac: ([x, c]: number[]): number => x / (x + c),
  threshold_add: ([value, threshold, addition]: number[]): number => value >= threshold ? addition : 0,
  data: ([x]: number[]) => x
}

const commutativeMonoidOperationSet = new Set(Object.keys(allCommutativeMonoidOperations) as (Node["operation"])[])

export function optimize(formulas: Node[], isFixed = (_formula: Node, _orig: Node) => false): Node[] {
  formulas = applyRead(formulas)
  formulas = constantFold(formulas, isFixed)
  formulas = flatten(formulas, isFixed)
  formulas = deduplicate(formulas)
  return formulas
}

export function flatten(formulas: Node[], isFixed = (_formula: Node, _orig: Node) => false): Node[] {
  const fixedNodes = new Set<Node>()

  return mapFormulas(formulas, f => f, (_formula, orig) => {
    let result = _formula
    if (commutativeMonoidOperationSet.has(_formula.operation)) {
      const formula = _formula as ComputeNode
      const { operation } = formula

      let flattened = false
      const operands = formula.operands.flatMap(dep =>
        (dep.operation === operation && !fixedNodes.has(dep)) ? (flattened = true, dep.operands) : [dep])
      result = flattened ? { ...formula, operands } : formula
    }

    if (isFixed(result, orig)) fixedNodes.add(result)
    return result
  })
}
export function deduplicate(formulas: Node[]): Node[] {
  function elementCounts<T>(array: T[]): Map<T, number> {
    const result = new Map<T, number>()
    for (const value of array) result.set(value, (result.get(value) ?? 0) + 1)
    return result
  }
  function arrayFromCounts<T>(counts: Map<T, number>): T[] {
    return [...counts].flatMap(([dep, count]) => Array(count).fill(dep))
  }

  let common = {
    counts: new Map<Node, number>(),
    formulas: new Set<Node>(),
    operation: "add" as Operation
  }

  while (true) {
    let next: typeof common | undefined

    const factored: ComputeNode = { operation: common.operation, operands: arrayFromCounts(common.counts) }

    let candidatesByOperation = new Map<Operation, [ComputeNode, Map<Node, number>][]>()
    for (const operation of Object.keys(allCommutativeMonoidOperations))
      candidatesByOperation.set(operation, [])

    formulas = mapFormulas(formulas, _formula => {
      if (common.formulas.has(_formula)) {
        const formula = _formula as ComputeNode
        const remainingCounts = new Map(common.counts)
        const operands = formula.operands.filter(dep => {
          const count = remainingCounts.get(dep)
          if (count) {
            remainingCounts.set(dep, count - 1)
            return false
          }
          return true
        })

        if (!operands.length)
          return factored
        operands.push(factored)
        return { ...formula, operands }
      }
      return _formula
    }, _formula => {
      if (!commutativeMonoidOperationSet.has(_formula.operation)) return _formula
      const formula = _formula as ComputeNode

      if (next) {
        if (next.operation === formula.operation) {
          const currentCounts = elementCounts(formula.operands), commonCounts = new Map<Node, number>()
          const nextCounts = next.counts
          let total = 0

          for (const [dependency, currentCount] of currentCounts.entries()) {
            const commonCount = Math.min(currentCount, nextCounts.get(dependency) ?? 0)
            if (commonCount) {
              commonCounts.set(dependency, commonCount)
              total += commonCount
            } else commonCounts.delete(dependency)
          }
          if (total > 1) {
            next.counts = commonCounts
            next.formulas.add(formula)
          }
        }
      } else {
        const candidates = candidatesByOperation.get(formula.operation)!
        const counts = elementCounts(formula.operands)

        for (const [candidate, candidateCounts] of candidates) {
          let total = 0

          const commonCounts = new Map<Node, number>()
          for (const [dependency, candidateCount] of candidateCounts.entries()) {
            const count = Math.min(candidateCount, counts.get(dependency) ?? 0)
            if (count) {
              commonCounts.set(dependency, count)
              total += count
            }
          }
          if (total > 1) {
            next = {
              counts: commonCounts,
              formulas: new Set([formula, candidate]),
              operation: formula.operation
            }
            candidatesByOperation.clear()
            break
          }
        }
        if (!next) candidates.push([formula, counts])
      }

      return formula
    })

    if (next) common = next
    else break
  }

  return formulas
}

/**
 * - Apply all `ReadNode`s
 * - Remove all `DataNode`s
 */
function applyRead(formulas: Node[], bottomUpMap = (formula: Node, _orig: Node) => formula): Node[] {
  const dataFromId = new Map<number, Data[]>(), nextIdsFromCurrentIds = new Map<number, Map<Data[], number>>()

  let currentMaxId = 1
  dataFromId.set(0, [])

  return mapContextualFormulas(formulas, (formula, contextId) => {
    switch (formula.operation) {
      case "data": {
        const { data, operands: [baseFormula] } = formula

        if (!nextIdsFromCurrentIds.has(contextId)) nextIdsFromCurrentIds.set(contextId, new Map())
        const nextIds = nextIdsFromCurrentIds.get(contextId)!
        if (nextIds.has(data)) return [baseFormula, nextIds.get(data)!]

        const nextId = currentMaxId++
        nextIds.set(data, nextId)
        dataFromId.set(nextId, [...dataFromId.get(contextId)!, ...data])

        return [baseFormula, nextId]
      }
      case "read": {
        const data = dataFromId.get(contextId)!

        const { accumulation, suffix } = formula
        const key = suffix ? [...formula.key, resolveStringNode(suffix, data)!] : formula.key
        const operands = data?.flatMap(context => {
          const formula = resolve(context.number, key)
          return formula ? [formula] : []
        })

        if (operands.length === 0)
          return [formula, contextId]

        if (accumulation === "unique") {
          if (operands.length !== 1)
            throw new Error("Duplicate entries in unique read")
          return [{ ...formula, ...(operands[0] as any) }, contextId]
        }
        return [{ ...formula, operation: accumulation, operands }, contextId]
      }
    }
    return [formula, contextId]
  }, bottomUpMap)
}

/**
 * Replace nodes with known values with appropriate constants,
 * avoiding removal of any nodes that pass `isFixed` predicate
 */
export function constantFold(formulas: Node[], isFixed = (_formula: Node, _orig: Node) => false): Node[] {
  const fixedNodes = new Set<Node>()

  return applyRead(formulas, (formula, orig) => {
    const { operation, operands } = formula
    let result = formula

    switch (operation) {
      case "threshold_add":
        const [value, threshold, addition] = operands
        if (value.operation === "const" && threshold.operation === "const" &&
          !fixedNodes.has(value) && !fixedNodes.has(threshold))
          result = value.value >= threshold.value ? addition : constant(0)
        break
      case "min": case "max": case "add": case "mul":
        const f = allOperations[operation]
        const numericOperands: number[] = []
        const formulaOperands: Node[] = operands.filter(formula =>
          (formula.operation !== "const" || fixedNodes.has(formula))
            ? true
            : (numericOperands.push(formula.value), false))
        const numericValue = f(numericOperands)

        if (operation === "mul" && numericValue === 0) {
          // The only (practical) degenerate case is
          //
          //  -  0 * ... = 0
          //
          // There are also
          //
          //  - max( infinity, ... ) = infinity
          //  - min( -infinity, ... ) = -infinity
          //  - infinity + ... = infinity
          //  - infinity * ... = infinity
          //
          // However, they will not appear under expected usage.
          result = constant(0)
          break
        }

        if (numericValue !== f([])) // Skip vacuous numeric
          formulaOperands.push(constant(numericValue))
        if (formulaOperands.length <= 1) result = formulaOperands[0] ?? constant(f([]))
        else result = { operation: formula.operation, operands: formulaOperands }
        break
      case "subscript": case "sum_frac": case "res":
        if (formula.operands.every(f => f.operation === "const" && !fixedNodes.has(f))) {
          const operands = (formula.operands as ConstantNode[]).map(({ value }) => value)
          const f = operation === "subscript"
            ? ([index]: number[]) => formula.list[index]
            : allOperations[operation]
          result = constant(f(operands))
        }
        break
      case "const": case "read": break
      case "data": throw new Error("Unreachable")
      default: assertUnreachable(operation) // Exhaustive switch
    }
    if (result !== formula) result = { ...formula, ...result }
    if (isFixed(result, orig)) fixedNodes.add(result)
    return result
  })
}

function resolveStringNode(node: StringNode, data: Data[]): string | undefined {
  const { operation } = node
  switch (operation) {
    case "const": return node.value
    case "read": {
      const { key, suffix } = node
      const operands = data.flatMap(context => {
        const formula = resolve(context.number, key) as StringNode | undefined
        return formula ? [formula] : []
      })

      if (operands.length > 1)
        throw new Error(`Found multiple entries while looking up unique path ${key}`)
      if (operands.length)
        return resolveStringNode(operands[0], data)
      return undefined
    }
    case "prio": {
      const { operands } = node
      for (const operand of operands) {
        const node = resolveStringNode(operand, data)
        if (node) return node
      }
      return undefined
    }
    default: assertUnreachable(operation)
  }
}