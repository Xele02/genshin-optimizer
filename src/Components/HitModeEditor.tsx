import { MenuItem, ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import { useContext } from 'react';
import { infusionNode } from "../Data/Characters/dataUtil";
import { DataContext } from "../DataContext";
import { uiInput as input } from "../Formula";
import { ElementKey } from "../Types/consts";
import ColorText from "./ColoredText";
import DropdownButton, { DropdownButtonProps } from "./DropdownMenu/DropdownButton";
import SolidToggleButtonGroup from "./SolidToggleButtonGroup";
import StatIcon, { uncoloredEleIcons } from "./StatIcon";
const infusionVals = {
  "": <span>No Team Melee Infusion</span>,
  "pyro": <span >{uncoloredEleIcons.pyro} Pyro Team Melee Infusion</span>,
  "cryo": <span >{uncoloredEleIcons.cryo} Cryo Team Melee Infusion</span>,
}
type InfusionAuraDropdownProps = Omit<DropdownButtonProps, "title" | "onChange" | "children">
export function InfusionAuraDropdown(props: InfusionAuraDropdownProps) {
  const { characterSheet, character: { infusionAura }, characterDispatch } = useContext(DataContext)
  if (!characterSheet?.isMelee()) return null
  return <DropdownButton title={infusionVals[infusionAura]} color={infusionAura || "secondary"} {...props}>
    {Object.entries(infusionVals).map(([key, text]) =>
      <MenuItem key={key} sx={key ? { color: `${key}.main` } : undefined}
        selected={key === infusionAura} disabled={key === infusionAura}
        onClick={() => characterDispatch({ infusionAura: key })}>{text}</MenuItem>)}
  </DropdownButton>
}

type ReactionToggleProps = Omit<ToggleButtonGroupProps, "color">
export function ReactionToggle(props: ReactionToggleProps) {
  const { data, character: { reactionMode }, characterDispatch } = useContext(DataContext)
  const charEleKey = data.get(input.charEle).value as ElementKey
  const infusion = data.get(infusionNode).value as ElementKey
  if (!["pyro", "hydro", "cryo"].includes(charEleKey) && !["pyro", "hydro", "cryo"].includes(infusion)) return null
  return <SolidToggleButtonGroup exclusive baseColor="secondary"
    value={reactionMode} onChange={(e, reactionMode) => characterDispatch({ reactionMode })} {...props}>
    <ToggleButton value="" >No Reactions</ToggleButton >
    {(charEleKey === "pyro" || infusion === "pyro") && <ToggleButton value="pyro_vaporize"  >
      <ColorText color="vaporize">Vaporize(Pyro){StatIcon.hydro}+{StatIcon.pyro}</ColorText>
    </ToggleButton >}
    {(charEleKey === "pyro" || infusion === "pyro") && <ToggleButton value={"pyro_melt"}  >
      <ColorText color="melt">Melt(Pyro) {StatIcon.cryo}+{StatIcon.pyro}</ColorText>
    </ToggleButton >}
    {(charEleKey === "hydro" || infusion === "hydro") && <ToggleButton value={"hydro_vaporize"}  >
      <ColorText color="vaporize">Vaporize(Hydro) {StatIcon.pyro}+{StatIcon.hydro}</ColorText>
    </ToggleButton >}
    {(charEleKey === "cryo" || infusion === "cryo") && <ToggleButton value={"cryo_melt"}  >
      <ColorText color="melt">Melt(Cryo) {StatIcon.pyro}+{StatIcon.cryo}</ColorText>
    </ToggleButton >}
  </SolidToggleButtonGroup>
}
type HitModeToggleProps = Omit<ToggleButtonGroupProps, "color">
export function HitModeToggle(props: HitModeToggleProps) {
  const { character: { hitMode }, characterDispatch } = useContext(DataContext)
  return <SolidToggleButtonGroup exclusive baseColor="secondary"
    value={hitMode} onChange={(e, hitMode) => characterDispatch({ hitMode })} {...props} >
    <ToggleButton value="avgHit">Avg. DMG</ToggleButton>
    <ToggleButton value="hit">Non Crit DMG</ToggleButton>
    <ToggleButton value="critHit">Crit Hit DMG</ToggleButton>
  </SolidToggleButtonGroup>
}
