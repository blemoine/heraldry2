import { Tincture } from './tincture';
import { Line } from './line';

export type FessParty = { name: 'fess'; tinctures: [Tincture, Tincture]; line: Line };
export type PaleParty = { name: 'pale'; tinctures: [Tincture, Tincture]; line: Line };
export type BendParty = { name: 'bend'; tinctures: [Tincture, Tincture]; line: Line };
export type BendSinisterParty = { name: 'bendSinister'; tinctures: [Tincture, Tincture]; line: Line };
export type ChevronParty = { name: 'chevron'; tinctures: [Tincture, Tincture]; line: Line };
export type CrossParty = { name: 'cross'; tinctures: [Tincture, Tincture]; line: Line };
export type SaltireParty = { name: 'saltire'; tinctures: [Tincture, Tincture]; line: Line };

export type Party = FessParty | PaleParty | BendParty | ChevronParty | BendSinisterParty | CrossParty | SaltireParty;

export const parties: Array<Party['name']> = ['fess', 'pale', 'bend', 'bendSinister', 'chevron', 'cross', 'saltire'];
