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
export type BendyField = {
  kind: 'bendy';
  tinctures: [Tincture, Tincture];
};

export type BarryField = {
  kind: 'barry';
  number: 6 | 8 | 10;
  tinctures: [Tincture, Tincture];
};

export type Field = PlainField | PartyField | PalyField | BendyField | BarryField;
