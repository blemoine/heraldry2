import { MetalsAndColours, Tincture } from './tincture';
import { Line } from './line';

export type Chief = { name: 'chief'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Bend = { name: 'bend'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Fess = { name: 'fess'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type BendSinister = {
  name: 'bendSinister';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export type OrdinaryCross = { name: 'cross'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Saltire = { name: 'saltire'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Bordure = { name: 'bordure'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Base = { name: 'base'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Pale = { name: 'pale'; tincture: Tincture; line: Line; count: 1 | 2; fimbriated: MetalsAndColours | null };
export type Chevron = {
  name: 'chevron';
  tincture: Tincture;
  line: Line;
  count: 1 | 2 | 3;
  fimbriated: MetalsAndColours | null;
};
export type Chevronel = {
  name: 'chevronel';
  tincture: Tincture;
  line: Line;
  count: 1 | 2 | 3;
  fimbriated: MetalsAndColours | null;
};
export type Pall = { name: 'pall'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type PallInverted = {
  name: 'pall-inverted';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export type Shakefork = { name: 'shakefork'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Quarter = { name: 'quarter'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Canton = { name: 'canton'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Gyron = { name: 'gyron'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type ChapePloye = {
  name: 'chape-ploye';
  tinctures: { kind: 'party'; per: 'pale'; tinctures: [Tincture, Tincture] } | { kind: 'simple'; tincture: Tincture };
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export type Chausse = {
  name: 'chausse';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
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
  | Gyron
  | Chausse;
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
    o === 'gyron' ||
    o === 'chausse'
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
  'chausse',
];
