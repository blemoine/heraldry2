import { Tincture } from './tincture';

export type FessParty = { name: 'fess'; tinctures: [Tincture, Tincture] };
export type PaleParty = { name: 'pale'; tinctures: [Tincture, Tincture] };
export type BendParty = { name: 'bend'; tinctures: [Tincture, Tincture] };
export type ChevronParty = { name: 'chevron'; tinctures: [Tincture, Tincture] };

export type Party = FessParty | PaleParty | BendParty | ChevronParty;

export const parties: Array<Party['name']> = ['fess', 'pale', 'bend', 'chevron'];
