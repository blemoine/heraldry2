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
export type Field = PlainField | PartyField;
