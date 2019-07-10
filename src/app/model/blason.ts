import { Tincture } from './tincture';
import { Ordinary } from './ordinary';
import { Party } from './party';

export type Field =
  | {
      kind: 'plain';
      tincture: Tincture;
    }
  | {
      kind: 'party';
      per: Party;
    };

export type Blason = {
  field: Field;
  ordinary?: Ordinary;
};
