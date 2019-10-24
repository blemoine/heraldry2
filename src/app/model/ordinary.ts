import { Tincture } from './tincture';
import { Line } from './line';

export type Chief = { name: 'chief'; tincture: Tincture; line: Line };
export type Bend = { name: 'bend'; tincture: Tincture; line: Line };
export type Fess = { name: 'fess'; tincture: Tincture; line: Line };
export type BendSinister = { name: 'bendSinister'; tincture: Tincture; line: Line };
export type OrdinaryCross = { name: 'cross'; tincture: Tincture; line: Line };
export type Saltire = { name: 'saltire'; tincture: Tincture; line: Line };
export type Bordure = { name: 'bordure'; tincture: Tincture; line: Line };
export type Base = { name: 'base'; tincture: Tincture; line: Line };
export type Pale = { name: 'pale'; tincture: Tincture; line: Line; count: 1 | 2 };
export type Chevron = { name: 'chevron'; tincture: Tincture; line: Line; count: 1 | 2 | 3 };
export type Chevronel = { name: 'chevronel'; tincture: Tincture; line: Line; count: 1 | 2 | 3 };
export type Pall = { name: 'pall'; tincture: Tincture; line: Line };
export type PallInverted = { name: 'pall-inverted'; tincture: Tincture; line: Line };
export type Shakefork = { name: 'shakefork'; tincture: Tincture; line: Line };
export type Quarter = { name: 'quarter'; tincture: Tincture; line: Line };
export type Canton = { name: 'canton'; tincture: Tincture; line: Line };
export type Gyron = { name: 'gyron'; tincture: Tincture; line: Line };
export type ChapePloye = {
  name: 'chape-ploye';
  tinctures: { kind: 'party'; per: 'pale'; tinctures: [Tincture, Tincture] } | { kind: 'simple'; tincture: Tincture };
  line: Line;
};
export const chapePloyeTincturesKind: ReadonlyArray<ChapePloye['tinctures']['kind']> = ['party', 'simple'] as const;

export type SubOrdinary =
  | Bordure
  | Base
  | Pall
  | PallInverted
  | Chevronel
  | Quarter
  | Canton
  | ChapePloye
  | Shakefork
  | Gyron;
export type Ordinary = Chief | Bend | BendSinister | Pale | Fess | Chevron | OrdinaryCross | Saltire | SubOrdinary;

export function isSubOrdinary(o: Ordinary['name']): o is SubOrdinary['name'] {
  return (
    o === 'bordure' ||
    o === 'base' ||
    o === 'chevronel' ||
    o === 'pall' ||
    o === 'pall-inverted' ||
    o === 'quarter' ||
    o === 'canton' ||
    o === 'chape-ploye' ||
    o === 'shakefork' ||
    o === 'gyron'
  );
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
  'pall',
  'pall-inverted',
  'shakefork',
  'quarter',
  'canton',
  'chape-ploye',
  'gyron',
];
