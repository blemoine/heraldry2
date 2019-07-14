import { Tincture } from './tincture';
import { Ordinary } from './ordinary';
import { Party } from './party';
import { Charge } from './charge';

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
  charge?: Charge;
};
