import { Tincture } from './tincture';

export type Chief = { name: 'chief'; tincture: Tincture };
export type Bend = { name: 'bend'; tincture: Tincture };
export type Pale = { name: 'pale'; tincture: Tincture };
export type Fess = { name: 'fess'; tincture: Tincture };
export type Chevron = { name: 'chevron'; tincture: Tincture };
export type Cross = { name: 'cross'; tincture: Tincture };
export type Saltire = { name: 'saltire'; tincture: Tincture };

export type Ordinary = Chief | Bend | Pale | Fess | Chevron | Cross | Saltire;

export const ordinaries: Array<Ordinary['name']> = ['chief', 'bend', 'pale', 'fess', 'chevron', 'cross', 'saltire'];
