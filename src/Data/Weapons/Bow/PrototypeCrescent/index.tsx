import { WeaponData } from 'pipeline'
import { input } from '../../../../Formula'
import { equal, percent, subscript } from '../../../../Formula/utils'
import { WeaponKey } from '../../../../Types/consts'
import { cond, sgt, trans } from '../../../SheetUtil'
import { dataObjForWeaponSheet } from '../../util'
import WeaponSheet, { conditionaldesc, conditionalHeader, IWeaponSheet } from '../../WeaponSheet'
import iconAwaken from './AwakenIcon.png'
import data_gen_json from './data_gen.json'
import icon from './Icon.png'

const key: WeaponKey = "PrototypeCrescent"
const [tr, trm] = trans("weapon", key)
const data_gen = data_gen_json as WeaponData

const atk_s = [.36, .45, .54, .63, .72]
const [condPassivePath, condPassive] = cond(key, "Unreturning")
const atk_ = equal(condPassive, "on", subscript(input.weapon.refineIndex, atk_s))
const moveSPD_ = equal(condPassive, "on", percent(.1))

const data = dataObjForWeaponSheet(key, data_gen, {
  premod: {
    atk_,
    moveSPD_
  }
})

const sheet: IWeaponSheet = {
  icon,
  iconAwaken,
  document: [{
    conditional: {
      value: condPassive,
      path: condPassivePath,
      header: conditionalHeader(tr, icon, iconAwaken),
      description: conditionaldesc(tr),
      name: trm("condName"),
      states: {
        on: {
          fields: [{
            node: atk_
          }, {
            node: moveSPD_
          }, {
            text: sgt("duration"),
            value: 10,
            unit: 's'
          }]
        }
      }
    }
  }],
}
export default new WeaponSheet(key, sheet, data_gen, data)
