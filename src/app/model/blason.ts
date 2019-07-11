import { Tincture } from './tincture';
import { Ordinary } from './ordinary';
import { Party } from './party';

export type PartyField = {
  kind: 'party';
  per: Party;
};
export type PlainField = {
  kind: 'plain';
  tincture: Tincture;
};
export type Field = PlainField | PartyField;

export type Blason = {
  field: Field;
  ordinary?: Ordinary;
};
