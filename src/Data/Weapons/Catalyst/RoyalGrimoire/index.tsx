import type { WeaponData } from 'pipeline'
import { input } from '../../../../Formula'
import { lookup, naught, prod, subscript } from "../../../../Formula/utils"
import { WeaponKey } from '../../../../Types/consts'
import { objectKeyMap, range } from '../../../../Util/Util'
import { cond, st, trans } from '../../../SheetUtil'
import { dataObjForWeaponSheet } from '../../util'
import WeaponSheet, { conditionaldesc, conditionalHeader, IWeaponSheet } from '../../WeaponSheet'
import iconAwaken from './AwakenIcon.png'
import data_gen_json from './data_gen.json'
import icon from './Icon.png'

const key: WeaponKey = "RoyalGrimoire"
const data_gen = data_gen_json as WeaponData

const [tr, trm] = trans("weapon", key)

const [condStackPath, condStack] = cond(key, "stack")
const crit_ = [0.08, 0.1, 0.12, 0.14, 0.16]
const critRate_ = lookup(condStack, objectKeyMap(range(1, 5), i => prod(subscript(input.weapon.refineIndex, crit_, { key: "_" }), i)), naught)
export const data = dataObjForWeaponSheet(key, data_gen, {
  premod: {
    critRate_
  },
})
const sheet: IWeaponSheet = {
  icon,
  iconAwaken,
  document: [{
    conditional: {
      value: condStack,
      path: condStackPath,
      header: conditionalHeader(tr, icon, iconAwaken, st("stacks")),
      description: conditionaldesc(tr),
      name: trm("condName"),
      states: Object.fromEntries(range(1, 5).map(i => [i, {
        name: st("stack", { count: i }),
        fields: [{ node: critRate_ }]
      }]))
    }
  }],
}
export default new WeaponSheet(key, sheet, data_gen, data)
