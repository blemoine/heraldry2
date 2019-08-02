import { Ordinary } from './ordinary';
import { Charge } from './charge';
import { Field } from './field';

export type Blason = {
  field: Field;
  ordinary?: Ordinary;
  charge?: Charge;
};
