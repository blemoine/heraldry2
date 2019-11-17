import { Party } from './party';
import { Tincture } from './tincture';
import { Tierced } from './tierced';
import { Line } from './line';

export type PartyField = {
  kind: 'party';
  per: Party;
};

export type TiercedField = {
  kind: 'tierced';
  per: Tierced;
};
export type PlainField = {
  kind: 'plain';
  tincture: Tincture;
};
export type PalyField = {
  kind: 'paly';
  tinctures: [Tincture, Tincture];
};

export type PalyPilyField = {
  kind: 'paly-pily';
  tinctures: [Tincture, Tincture];
};
export type BarryPilyField = {
  kind: 'barry-pily';
  tinctures: [Tincture, Tincture];
};
export type BendyPilyField = {
  kind: 'bendy-pily';
  tinctures: [Tincture, Tincture];
};
export type BendyPilySinisterField = {
  kind: 'bendy-pily-sinister';
  tinctures: [Tincture, Tincture];
};
export type BendyField = {
  kind: 'bendy';
  number: 6 | 8 | 10;
  tinctures: [Tincture, Tincture];
  line: Line;
};
export type BendySinisterField = {
  kind: 'bendySinister';
  number: 6 | 8 | 10;
  tinctures: [Tincture, Tincture];
  line: Line;
};

export type BarryField = {
  kind: 'barry';
  number: 6 | 8 | 10;
  tinctures: [Tincture, Tincture];
  line: Line;
};

export type ChequyField = {
  kind: 'chequy';
  tinctures: [Tincture, Tincture];
};

export type LozengyField = {
  kind: 'lozengy';
  tinctures: [Tincture, Tincture];
};

export type LozengyBendwiseField = {
  kind: 'lozengy-bendwise';
  tinctures: [Tincture, Tincture];
};

export type ChevronnyField = {
  kind: 'chevronny';
  tinctures: [Tincture, Tincture];
};
export type ChevronnyReversedField = {
  kind: 'chevronny-reversed';
  tinctures: [Tincture, Tincture];
};

export type GironnyField = {
  kind: 'gironny';
  number: 8 | 10 | 12;
  tinctures: [Tincture, Tincture];
};

export type QuarterlyOfNineField = {
  kind: 'quarterly-of-nine';
  tinctures: [Tincture, Tincture];
};

export type EmbraseeDexterField = {
  kind: 'embrassee-a-dexter';
  tinctures: [Tincture, Tincture];
};
export type EmbraseeSinisterField = {
  kind: 'embrassee-a-sinister';
  tinctures: [Tincture, Tincture];
};

export type LozengeThroughout = {
  kind: 'lozenge-throughout';
  tinctures: [Tincture, Tincture];
};

export type LozengeThroughoutArched = {
  kind: 'lozenge-throughout-arched';
  tinctures: [Tincture, Tincture];
};

export type BarryAndPerPaleField = {
  kind: 'barry-and-per-pale';
  tinctures: [Tincture, Tincture];
};
export type BendyAndPerBendSinisterField = {
  kind: 'bendy-and-per-bend-sinister';
  tinctures: [Tincture, Tincture];
};
export type BendySinisterAndPerBendField = {
  kind: 'bendy-sinister-and-per-bend';
  tinctures: [Tincture, Tincture];
};
export type BendyAndPerPaleField = {
  kind: 'bendy-and-per-pale';
  tinctures: [Tincture, Tincture];
};
export type BarryAndPerChevronThroughoutField = {
  kind: 'barry-and-per-chevron-throughout';
  tinctures: [Tincture, Tincture];
};

export type Field =
  | PlainField
  | PartyField
  | TiercedField
  | PalyField
  | BendyField
  | BendySinisterField
  | BarryField
  | BarryAndPerPaleField
  | BendyAndPerBendSinisterField
  | BendySinisterAndPerBendField
  | BendyAndPerPaleField
  | BarryAndPerChevronThroughoutField
  | ChequyField
  | LozengyField
  | PalyPilyField
  | BarryPilyField
  | BendyPilyField
  | BendyPilySinisterField
  | ChevronnyField
  | ChevronnyReversedField
  | GironnyField
  | QuarterlyOfNineField
  | LozengyBendwiseField
  | EmbraseeDexterField
  | EmbraseeSinisterField
  | LozengeThroughout
  | LozengeThroughoutArched;
export const fieldKinds: Array<Field['kind']> = [
  'plain',
  'party',
  'tierced',
  'bendy',
  'bendySinister',
  'paly',
  'barry',
  'gironny',
  'chevronny',
  'chevronny-reversed',
  'chequy',
  'lozengy',
  'paly-pily',
  'barry-pily',
  'bendy-pily',
  'bendy-pily-sinister',
  'quarterly-of-nine',
  'lozengy-bendwise',
  'embrassee-a-dexter',
  'embrassee-a-sinister',
  'lozenge-throughout',
  'lozenge-throughout-arched',
  'barry-and-per-pale',
  'bendy-and-per-bend-sinister',
  'bendy-sinister-and-per-bend',
  'bendy-and-per-pale',
  'barry-and-per-chevron-throughout',
];
