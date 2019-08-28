import { Party } from './party';
import { Tincture } from './tincture';

export type PartyField = {
  kind: 'party';
  per: Party;
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
export type BendyField = {
  kind: 'bendy';
  tinctures: [Tincture, Tincture];
};
export type BendySinisterField = {
  kind: 'bendySinister';
  tinctures: [Tincture, Tincture];
};

export type BarryField = {
  kind: 'barry';
  number: 6 | 8 | 10;
  tinctures: [Tincture, Tincture];
};

export type ChequyField = {
  kind: 'chequy';
  tinctures: [Tincture, Tincture];
};

export type LozengyField = {
  kind: 'lozengy';
  tinctures: [Tincture, Tincture];
};

export type ChevronnyField = {
  kind: 'chevronny';
  tinctures: [Tincture, Tincture];
};

export type Field =
  | PlainField
  | PartyField
  | PalyField
  | BendyField
  | BendySinisterField
  | BarryField
  | ChequyField
  | LozengyField
  | PalyPilyField
  | BarryPilyField
  | ChevronnyField;
export const fieldKinds: Array<Field['kind']> = [
  'plain',
  'bendy',
  'bendySinister',
  'paly',
  'party',
  'barry',
  'chequy',
  'lozengy',
  'paly-pily',
  'barry-pily',
  'chevronny',
];
