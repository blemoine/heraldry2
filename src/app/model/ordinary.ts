import { Tincture } from './tincture';
import { Line } from './line';

export type Chief = { name: 'chief'; tincture: Tincture; line: Line };
export type Bend = { name: 'bend'; tincture: Tincture; line: Line };
export type Fess = { name: 'fess'; tincture: Tincture; line: Line };
export type BendSinister = { name: 'bendSinister'; tincture: Tincture; line: Line };
export type Cross = { name: 'cross'; tincture: Tincture; line: Line };
export type Saltire = { name: 'saltire'; tincture: Tincture; line: Line };
export type Bordure = { name: 'bordure'; tincture: Tincture; line: Line };
export type Base = { name: 'base'; tincture: Tincture; line: Line };
export type Pale = { name: 'pale'; tincture: Tincture; line: Line; count: 1 | 2 };
export type Chevron = { name: 'chevron'; tincture: Tincture; line: Line; count: 1 | 2 | 3 };
export type Chevronel = { name: 'chevronel'; tincture: Tincture; line: Line; count: 1 | 2 | 3 };

export type SubOrdinary = Bordure | Base;
export type Ordinary = Chief | Bend | BendSinister | Pale | Fess | Chevron | Cross | Saltire | SubOrdinary | Chevronel;

export function isSubOrdinary(o: Ordinary['name']): o is SubOrdinary['name'] {
  return o === 'bordure' || o === 'base' || o === 'chevronel';
}

export const ordinaries: Array<Ordinary['name']> = [
  'chief',
  'bend',
  'bendSinister',
  'pale',
  'fess',
  'chevron',
  'cross',
  'saltire',
  'bordure',
  'base',
  'chevronel',
];
