import { Tincture } from './tincture';
import { Line } from './line';

export type FessTierced = { name: 'fess'; tinctures: [Tincture, Tincture, Tincture]; line: Line };
export type PaleTierced = { name: 'pale'; tinctures: [Tincture, Tincture, Tincture]; line: Line };

export type Tierced = FessTierced | PaleTierced;

export const tierceds: Array<Tierced['name']> = ['fess', 'pale'];
