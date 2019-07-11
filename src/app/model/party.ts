import { Tincture } from './tincture';

export type FessParty = { name: 'fess'; tinctures: [Tincture, Tincture] };
export type PaleParty = { name: 'pale'; tinctures: [Tincture, Tincture] };
export type BendParty = { name: 'bend'; tinctures: [Tincture, Tincture] };
export type BendSinisterParty = { name: 'bendSinister'; tinctures: [Tincture, Tincture] };
export type ChevronParty = { name: 'chevron'; tinctures: [Tincture, Tincture] };
export type CrossParty = { name: 'cross'; tinctures: [Tincture, Tincture] };
export type SaltireParty = { name: 'saltire'; tinctures: [Tincture, Tincture] };

export type Party = FessParty | PaleParty | BendParty | ChevronParty | BendSinisterParty | CrossParty | SaltireParty;

export const parties: Array<Party['name']> = ['fess', 'pale', 'bend', 'bendSinister', 'chevron', 'cross', 'saltire'];
