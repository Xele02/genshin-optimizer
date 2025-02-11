import { CharacterData } from 'pipeline'
import { input, target } from '../../../Formula'
import { constant, equal, equalStr, greaterEq, infoMut, lookup, percent, prod } from '../../../Formula/utils'
import { CharacterKey, ElementKey, WeaponTypeKey } from '../../../Types/consts'
import { cond, trans } from '../../SheetUtil'
import CharacterSheet, { conditionalHeader, ICharacterSheet, normalSrc, talentTemplate } from '../CharacterSheet'
import { customDmgNode, dataObjForCharacterSheet, dmgNode } from '../dataUtil'
import { banner, burst, c1, c2, c3, c4, c5, c6, card, passive1, passive2, passive3, skill, thumb, thumbSide } from './assets'
import data_gen_src from './data_gen.json'
import skillParam_gen from './skillParam_gen.json'

const data_gen = data_gen_src as CharacterData

const key: CharacterKey = "Chongyun"
const elementKey: ElementKey = "cryo"
const [tr, trm] = trans("char", key)

let s = 0, b = 0, p1 = 0, p2 = 0
const datamine = {
  normal: {
    hitArr: [
      skillParam_gen.auto[0], // 1
      skillParam_gen.auto[1], // 2
      skillParam_gen.auto[2], // 3
      skillParam_gen.auto[3], // 4
    ]
  },
  charged: {
    spin_dmg: skillParam_gen.auto[4],
    final_dmg: skillParam_gen.auto[5],
    stamina: skillParam_gen.auto[6][0],
    duration: skillParam_gen.auto[7][0],
  },
  plunging: {
    dmg: skillParam_gen.auto[8],
    low: skillParam_gen.auto[9],
    high: skillParam_gen.auto[10],
  },
  skill: {
    dmg: skillParam_gen.skill[s++],
    infusionDuration: skillParam_gen.skill[s++][0],
    cd: skillParam_gen.skill[s++][0],
    fieldDuration: skillParam_gen.skill[s++][0],
  },
  burst: {
    dmg: skillParam_gen.burst[b++],
    cd: skillParam_gen.burst[b++][0],
    enerCost: skillParam_gen.burst[b++][0],
  },
  passive1: {
    atk_spd: skillParam_gen.passive1[p1++][0],
  },
  passive2: {
    dmg: skillParam_gen.passive2[p2++][0],
    res: skillParam_gen.passive2[p2++][0],
    duration: skillParam_gen.passive2[p2++][0],
  },
  constellation1: {
    dmg: skillParam_gen.constellation1[0],
  },
  constellation2: {
    cdr: skillParam_gen.constellation2[0],
  },
  constellation4: {
    energy_regen: skillParam_gen.constellation4[0],
    cd: skillParam_gen.constellation4[1],
  },
  constellation6: {
    burst_dmg_: skillParam_gen.constellation6[0],
  }
} as const

const [condAsc4Path, condAsc4] = cond(key, "asc4")
const [condSkillPath, condSkill] = cond(key, "skill")
const [condC6Path, condC6] = cond(key, "c6")

const skillDmg = dmgNode("atk", datamine.skill.dmg, "skill")

const dmgFormulas = {
  normal: Object.fromEntries(datamine.normal.hitArr.map((arr, i) =>
    [i, dmgNode("atk", arr, "normal")])),
  charged: {
    spinningDmg: dmgNode("atk", datamine.charged.spin_dmg, "charged"),
    finalDmg: dmgNode("atk", datamine.charged.final_dmg, "charged"),
  },
  plunging: Object.fromEntries(Object.entries(datamine.plunging).map(([key, value]) =>
    [key, dmgNode("atk", value, "plunging")])),
  skill: {
    dmg: skillDmg,
  },
  burst: {
    dmg: dmgNode("atk", datamine.burst.dmg, "burst"),
  },
  passive2: {
    dmg: greaterEq(input.asc, 4, skillDmg),
  },
  constellation1: {
    dmg: greaterEq(input.constellation, 1, customDmgNode(prod(percent(datamine.constellation1.dmg), input.total.atk), "elemental", { hit: { ele: constant(elementKey) } }))
  }
}

const nodeAsc1 = greaterEq(input.asc, 1, percent(0.08))
const nodeAsc4 = greaterEq(input.asc, 4,
  equal(condAsc4, "hit",
    -0.10
  )
)
const activeInArea = equal("activeInArea", condSkill, equal(input.activeCharKey, target.charKey, 1))

const correctWep =
  lookup(target.weaponType,
    { "sword": constant(1), "claymore": constant(1), "polearm": constant(1) }, constant(0));

const activeInAreaInfusion = equalStr(correctWep, 1, equalStr(activeInArea, 1, elementKey))

const nodeC6 = greaterEq(input.constellation, 6, equal(condC6, "on", datamine.constellation6.burst_dmg_))

const nodeC3 = greaterEq(input.constellation, 3, 3)
const nodeC5 = greaterEq(input.constellation, 5, 3)

export const data = dataObjForCharacterSheet(key, elementKey, "liyue", data_gen, dmgFormulas, {
  bonus: {
    skill: nodeC5,
    burst: nodeC3,
  },
  premod: {
    burst_dmg_: nodeC6,
  },
  teamBuff: {
    premod: {
      cryo_enemyRes_: nodeAsc4,
      atkSPD_: nodeAsc1
    },
    infusion: {
      team: activeInAreaInfusion,
    },
  },
})

const sheet: ICharacterSheet = {
  name: tr("name"),
  cardImg: card,
  thumbImg: thumb,
  thumbImgSide: thumbSide,
  bannerImg: banner,
  rarity: data_gen.star,
  elementKey: "cryo",
  weaponTypeKey: data_gen.weaponTypeKey as WeaponTypeKey,
  gender: "M",
  constellationName: tr("constellationName"),
  title: tr("title"),
  talent: {
    sheets: {
      auto: {
        name: tr("auto.name"),
        img: normalSrc(data_gen.weaponTypeKey),
        sections: [{
          text: tr("auto.fields.normal"),
          fields: datamine.normal.hitArr.map((_, i) => ({
            node: infoMut(dmgFormulas.normal[i], { key: `char_${key}_gen:auto.skillParams.${i}` }),
          }))
        }, {
          text: tr("auto.fields.charged"),
          fields: [{
            node: infoMut(dmgFormulas.charged.spinningDmg, { key: `char_${key}_gen:auto.skillParams.4` }),
          }, {
            node: infoMut(dmgFormulas.charged.finalDmg, { key: `char_${key}_gen:auto.skillParams.5` }),
          }, {
            text: tr("auto.skillParams.6"),
            value: datamine.charged.stamina,
            unit: '/s'
          }, {
            text: tr("auto.skillParams.7"),
            value: datamine.charged.duration,
            unit: 's'
          }]
        }, {
          text: tr(`auto.fields.plunging`),
          fields: [{
            node: infoMut(dmgFormulas.plunging.dmg, { key: "sheet_gen:plunging.dmg" }),
          }, {
            node: infoMut(dmgFormulas.plunging.low, { key: "sheet_gen:plunging.low" }),
          }, {
            node: infoMut(dmgFormulas.plunging.high, { key: "sheet_gen:plunging.high" }),
          }]
        }],
      },
      skill: talentTemplate("skill", tr, skill, [{
        node: infoMut(dmgFormulas.skill.dmg, { key: `char_${key}_gen:skill.skillParams.0` }),
      }, {
        text: tr("skill.skillParams.2"),
        value: datamine.skill.fieldDuration,
        unit: "s"
      }, {
        text: tr("skill.skillParams.3"),
        value: datamine.skill.cd,
        unit: "s"
      }], {
        teamBuff: true,
        value: condSkill,
        path: condSkillPath,
        name: trm("activeCharField"),
        states: {
          activeInArea: {
            name: "Frost Field",
            fields: [{
              text: trm("infusion"),
              variant: elementKey
            }, {
              text: tr("skill.skillParams.1"),
              value: datamine.skill.infusionDuration,
              unit: "s"
            }, {
              node: nodeAsc1
            }]
          },
        }
      }),
      burst: {
        name: tr("burst.name"),
        img: burst,
        sections: [{
          text: tr("burst.description"),
          fields: [{
            node: infoMut(dmgFormulas.burst.dmg, { key: `char_${key}_gen:burst.skillParams.0` }),
          }, {
            text: tr("burst.skillParams.1"),
            value: datamine.burst.cd,
            unit: "s"
          }, {
            text: tr("burst.skillParams.2"),
            value: datamine.burst.enerCost,
          }, {
            text: "Spirit Blades Summoned",
            value: data => data.get(input.constellation).value < 6 ? 3 : 4
          }]
        }]
      },
      passive1: talentTemplate("passive1", tr, passive1),
      passive2: talentTemplate("passive2", tr, passive2, [{
        node: infoMut(dmgFormulas.passive2.dmg, { key: `char_${key}:passive2` }),
      }], {
        teamBuff: true,
        canShow: greaterEq(input.asc, 4, 1),
        value: condAsc4,
        path: condAsc4Path,
        header: conditionalHeader("passive2", tr, passive2),
        description: tr("passive2.description"),
        name: trm("asc4Cond"),
        states: {
          hit: {
            fields: [{
              node: nodeAsc4
            }]
          },
        }
      }
      ),
      passive3: talentTemplate("passive3", tr, passive3),
      constellation1: talentTemplate("constellation1", tr, c1, [{
        node: infoMut(dmgFormulas.constellation1.dmg, { key: `char_${key}:constellation1` })
      }]),
      constellation2: talentTemplate("constellation2", tr, c2),
      constellation3: talentTemplate("constellation3", tr, c3, [{ node: nodeC3 }]),
      constellation4: talentTemplate("constellation4", tr, c4),
      constellation5: talentTemplate("constellation5", tr, c5, [{ node: nodeC5 }]),
      constellation6: talentTemplate("constellation6", tr, c6, undefined, {
        value: condC6,
        path: condC6Path,
        canShow: greaterEq(input.constellation, 6, 1),
        name: trm("constellation6"),
        states: {
          on: {
            fields: [{
              node: nodeC6
            }]
          }
        }
      }),
    },
  },
};
export default new CharacterSheet(sheet, data);
