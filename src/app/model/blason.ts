import { Ordinary } from './ordinary';
import { Charge } from './charge';
import { Field } from './field';

export type SimpleBlason = {
  kind: 'simple',
  field: Field;
  ordinary?: Ordinary;
  charge?: Charge;
};
export type QuarterlyBlason = {
  kind: 'quarterly',
  blasons: readonly [SimpleBlason,SimpleBlason,SimpleBlason,SimpleBlason]
}
export type Blason = SimpleBlason | QuarterlyBlason;
