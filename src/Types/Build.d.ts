import { ICachedArtifact, MainStatKey, StatKey, SubstatKey } from "./artifact_WR"
import { ArtifactSetKey, SlotKey } from "./consts"

export type ArtifactsBySlot = Dict<SlotKey, ICachedArtifact[]>
export type SetFilter = { key: ArtifactSetKey | "", num: number }[]
export interface BuildSetting {
  setFilters: SetFilter,
  statFilters: Dict<StatKey, number>
  mainStatKeys: {
    sands: MainStatKey[],
    goblet: MainStatKey[],
    circlet: MainStatKey[],
    flower?: never,
    plume?: never,
  },
  optimizationTarget?: string[],
  assumptionLevelSetting: BuildSettingAssumptionLevel,
  useExcludedArts: boolean,
  useEquippedArts: boolean,
  builds: string[][]
  buildDate: number,
  maxBuildsToShow: number,
  plotBase: MainStatKey | SubstatKey | "",
  compareBuild: boolean,
  levelLow: number,
  levelHigh: number,
}
export interface BuildSettingAssumptionLevel {
  mainStatAssumptionLevel: number,
  levelSubStats: boolean,
  subStatLevelPriority:SubstatKey[],
  subStatRollSelection:number,
  subStatRollPolicy:number,
}
export type ArtifactsBySlot = Dict<SlotKey, ICachedArtifact[]>
