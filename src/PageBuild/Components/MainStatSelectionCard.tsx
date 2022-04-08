import { CheckBox, CheckBoxOutlineBlank, Info, Replay } from '@mui/icons-material';
import { Button, CardContent, Divider, Grid, MenuItem, Typography, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import SlotNameWithIcon from '../../Components/Artifact/SlotNameWIthIcon';
import BootstrapTooltip from '../../Components/BootstrapTooltip';
import CardDark from '../../Components/Card/CardDark';
import CardLight from '../../Components/Card/CardLight';
import DropdownButton from '../../Components/DropdownMenu/DropdownButton';
import SqBadge from '../../Components/SqBadge';
import StatIcon from '../../Components/StatIcon';
import KeyMap from '../../KeyMap';
import { allSubstats, MainStatKey, SubstatKey } from '../../Types/artifact';
import { BuildSetting, BuildSettingAssumptionLevel } from '../../Types/Build';
import { SlotKey } from '../../Types/consts';
import Artifact from '../../Data/Artifacts/Artifact';
import {  useTranslation } from 'react-i18next';

export const artifactsSlotsToSelectMainStats = ["sands", "goblet", "circlet"] as const

export default function MainStatSelectionCard({ mainStatAssumptionLevel, mainStatKeys, onChangeMainStatKey, onChangeAssLevel, disabled = false, assumptionLevelSetting, onChangeAssumptionLevelSetting }: {
  mainStatAssumptionLevel: number
  mainStatKeys: BuildSetting["mainStatKeys"]
  onChangeMainStatKey: (slotKey: SlotKey, mainStatKey?: MainStatKey) => void
  onChangeAssLevel: (level: number) => void
  disabled?: boolean
  assumptionLevelSetting: BuildSettingAssumptionLevel
  onChangeAssumptionLevelSetting: (action) => void
}) {
  const { t } = useTranslation("artifact")
  return <CardLight>
    <CardContent sx={{ py: 1 }} >
      <Grid container alignItems="center" spacing={2}>
        <Grid item flexGrow={1}>
          <Typography>Artifact Main Stat</Typography>
        </Grid>
        <Grid item>
          <BootstrapTooltip placement="top" title={<Typography><strong>Level Assumption</strong> changes mainstat value to be at least a specific level. Does not change substats.</Typography>}>
            <Info />
          </BootstrapTooltip>
        </Grid>
        <Grid item>
          <AssumeFullLevelToggle mainStatAssumptionLevel={mainStatAssumptionLevel} setmainStatAssumptionLevel={v => onChangeAssLevel(v)} disabled={disabled} />
        </Grid>
      </Grid>
    </CardContent>
    <Divider />
    <CardContent sx={{
      // select all excluding last
      "> div:nth-last-of-type(n+2)": { mb: 1 }
    }}>
      {artifactsSlotsToSelectMainStats.map(slotKey => {
        const numSel = mainStatKeys[slotKey].length
        return <CardDark key={slotKey}>
          <CardContent sx={{ py: 1 }}><Grid container spacing={1}>
            <Grid item ><SlotNameWithIcon slotKey={slotKey} /></Grid>
            <Grid item flexGrow={1}>
              <SqBadge color="info">{numSel ? `${numSel} Selected` : `Any`}</SqBadge>
            </Grid>
            <Grid item>
              <Button color="error" size="small" disabled={!mainStatKeys[slotKey].length || disabled}
                onClick={() => onChangeMainStatKey(slotKey)}>
                <Replay />
              </Button>
            </Grid>
          </Grid></CardContent>
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              {Artifact.slotMainStats(slotKey).map((mainStatKey, i) => {
                const selected = mainStatKeys[slotKey].includes(mainStatKey)
                return <Grid item xs={i < 3 ? 4 : 6} key={mainStatKey} >
                  <Button fullWidth size="small" color={selected ? "success" : "secondary"} disabled={disabled} sx={{ height: "100%" }}
                    onClick={() => onChangeMainStatKey(slotKey, mainStatKey)} startIcon={StatIcon[mainStatKey]}>
                    {KeyMap.get(mainStatKey)}
                  </Button>
                </Grid>
              })}
            </Grid>
          </CardContent>
        </CardDark>
      })}
    </CardContent>
    <Divider />
    <CardContent sx={{ py: 1 }} >
      <Grid container alignItems="center" spacing={2}>
        <Grid item flexGrow={1}>
          <Typography>Artifact Sub Stat</Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => onChangeAssumptionLevelSetting({ levelSubStats: !assumptionLevelSetting.levelSubStats })} startIcon={assumptionLevelSetting.levelSubStats ? <CheckBox /> : <CheckBoxOutlineBlank />}>
            Level Substats
          </Button>
        </Grid>
      </Grid>
    </CardContent>
    <Divider />
    <CardContent sx={{ py: 1 }} >
      <Typography>Roll priority : </Typography>
      <Grid container spacing={1}>
        {[0, 1, 2, 3].map(idx =>
          <Grid item>
        <DropdownButton
          startIcon={getKey(idx, assumptionLevelSetting) ? StatIcon[getKey(idx, assumptionLevelSetting)] : undefined}
          title={getKey(idx, assumptionLevelSetting) ? KeyMap.getArtStr(getKey(idx, assumptionLevelSetting)) : t('editor.substat.substatFormat', { value: idx + 1 })}
          color={getKey(idx, assumptionLevelSetting) ? "success" : "primary"}
          sx={{ whiteSpace: "nowrap" }}>
          {getKey(idx, assumptionLevelSetting) && <MenuItem onClick={() => onChangeAssumptionLevelSetting({type:"setSubstatePrio", idx: idx, stat: ""})}>{t`editor.substat.noSubstat`}</MenuItem>}
          {allSubstats
            .map(k => <MenuItem key={k} selected={getKey(idx, assumptionLevelSetting) === k} disabled={getKey(idx, assumptionLevelSetting) === k} onClick={() => onChangeAssumptionLevelSetting({type:"setSubstatePrio", idx: idx, stat: k})} >
              <ListItemIcon>{StatIcon[k]}</ListItemIcon>
              <ListItemText>{KeyMap.getArtStr(k)}</ListItemText>
            </MenuItem>)}
        </DropdownButton>
        </Grid>)
      }
      </Grid>
      <Typography>Roll policy : </Typography>
      <Grid container spacing={1}>
        <Grid item><RollPolicyToggle rollPolicyLevel={assumptionLevelSetting.subStatRollPolicy} setrollPolicyLevel={v => onChangeAssumptionLevelSetting({subStatRollPolicy:v})} /></Grid>
        <Grid item><RollSelectionToggle rollSelectionLevel={assumptionLevelSetting.subStatRollSelection} setrollSelectionLevel={v => onChangeAssumptionLevelSetting({subStatRollSelection:v})} /></Grid>
      </Grid>
    </CardContent>
  </CardLight>
}

function getKey(idx: number, assumptionLevelSetting: BuildSettingAssumptionLevel) : SubstatKey
{
  return assumptionLevelSetting.subStatLevelPriority && assumptionLevelSetting.subStatLevelPriority.length > idx ? assumptionLevelSetting.subStatLevelPriority[idx] : ""
}

const levels = {
  0: <span>No level assumption</span>,
  4: <span>Assume at least level 4</span>,
  8: <span>Assume at least level 8</span>,
  12: <span>Assume at least level 12</span>,
  16: <span>Assume at least level 16</span>,
  20: <span>Assume at least level 20</span>
} as const
function AssumeFullLevelToggle({ mainStatAssumptionLevel = 0, setmainStatAssumptionLevel, disabled }) {
  return <DropdownButton color={mainStatAssumptionLevel ? "warning" : "primary"} disabled={disabled} title={levels[mainStatAssumptionLevel]}>
    {Object.entries(levels).map(([key, text]) => <MenuItem key={key} onClick={() => setmainStatAssumptionLevel(parseInt(key))}>{text}</MenuItem>)}
  </DropdownButton>
}

const rollSelection = {
  0: <span>Create if not exist</span>,
  1: <span>Roll only existing stat</span>,
  2: <span>First roll existing then create</span>
} as const
function RollSelectionToggle({rollSelectionLevel = 0, setrollSelectionLevel}) {
  return <DropdownButton title={rollSelection[rollSelectionLevel]}>
    {Object.entries(rollSelection).map(([key, text]) => <MenuItem key={key} onClick={() => setrollSelectionLevel(parseInt(key))}>{text}</MenuItem>)}
  </DropdownButton>
}

const rollPolicy = {
  0: <span>All roll on same stat</span>,
  1: <span>Dispatch roll between substat</span>
} as const
function RollPolicyToggle({rollPolicyLevel = 0, setrollPolicyLevel}) {
  return <DropdownButton title={rollPolicy[rollPolicyLevel]}>
    {Object.entries(rollPolicy).map(([key, text]) => <MenuItem key={key} onClick={() => setrollPolicyLevel(parseInt(key))}>{text}</MenuItem>)}
  </DropdownButton>
}
