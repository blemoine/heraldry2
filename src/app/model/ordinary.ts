import { MetalsAndColours, Tincture } from './tincture';
import { Line } from './line';
import { Charge } from './charge';

export type Chief = {
  name: 'chief';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
  charge: Charge | null;
};
export type Bend = {
  name: 'bend';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export type BendSinister = {
  name: 'bendSinister';
  tincture: Tincture;
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export type Fess = { name: 'fess'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null; count: 1 | 2 };
export type OrdinaryCross = { name: 'cross'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Saltire = { name: 'saltire'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Bordure = { name: 'bordure'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Orle = { name: 'orle'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
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
export type Gore = { name: 'gore'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
export type Flaunches = { name: 'flaunches'; tincture: Tincture; line: Line; fimbriated: MetalsAndColours | null };
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
export type ChaussePloye = {
  name: 'chausse-ploye';
  tinctures: { kind: 'party'; per: 'pale'; tinctures: [Tincture, Tincture] } | { kind: 'simple'; tincture: Tincture };
  line: Line;
  fimbriated: MetalsAndColours | null;
};
export const chapePloyeTincturesKind: ReadonlyArray<ChapePloye['tinctures']['kind']> = ['party', 'simple'] as const;

export type SubOrdinary =
  | Bordure
  | Orle
  | Base
  | Pall
  | PallInverted
  | Chevronel
  | Quarter
  | Canton
  | ChapePloye
  | Shakefork
  | Gyron
  | Chausse
  | ChaussePloye
  | Gore
  | Flaunches;
export type Ordinary = Chief | Bend | BendSinister | Pale | Fess | Chevron | OrdinaryCross | Saltire | SubOrdinary;

const subOrdinaries: Array<SubOrdinary['name']> = [
  'bordure',
  'orle',
  'base',
  'chevronel',
  'pall',
  'pall-inverted',
  'quarter',
  'canton',
  'chape-ploye',
  'shakefork',
  'gyron',
  'chausse',
  'chausse-ploye',
  'gore',
  'flaunches',
];
export function isSubOrdinary(o: Ordinary['name']): o is SubOrdinary['name'] {
  return subOrdinaries.includes(o as SubOrdinary['name']);
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
  ...subOrdinaries,
];

export const withChargeOrdinaries = ['chief'] as const;
type OrdinaryWithCharge = Chief;
export function hasOrdinaryCharge(x: Ordinary): x is OrdinaryWithCharge {
  return withChargeOrdinaries.includes(x.name as OrdinaryWithCharge['name']);
}
