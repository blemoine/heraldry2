import { Cross } from '~/plugins/charges/cross/cross';
import { Eagle } from '~/plugins/charges/eagle/eagle';
import { Escutcheon } from '~/plugins/charges/escutcheon/escutcheon';
import { FleurDeLys } from '~/plugins/charges/fleurdelys/fleurdelys';
import { Lion } from '~/plugins/charges/lion/lion';
import { Lozenge } from '~/plugins/charges/lozenge/lozenge';
import { Mullet } from '~/plugins/charges/mullet/mullet';
import { Roundel } from '~/plugins/charges/roundel/roundel';

export const chargeNames = [
  'cross',
  'eagle',
  'escutcheon',
  'fleurdelys',
  'lion',
  'lozenge',
  'mullet',
  'roundel',
] as const;
export type ChargeName = typeof chargeNames[number];

const chargeClasses = [Cross, Eagle, Escutcheon, FleurDeLys, Lion, Lozenge, Mullet, Roundel] as const;

const charges: { [key: string]: any } = {};
chargeNames.forEach((key: string, index) => (charges[key] = chargeClasses[index]));

export function getChargeClassByName(name: ChargeName) {
  return charges[name];
}
