import fc from 'fast-check';
import { stringifyBlason } from '../from-blason/blason.helpers';
import { parseBlason } from './blasonParser';
import { blasonArb } from '../model/tests/arbitraries';

describe('parseBlason and stringify', () => {
  it('should be invert of each other', () => {
    fc.assert(
      fc.property(blasonArb, (blason) => {
        expect(parseBlason(stringifyBlason(blason))).toEqual(blason);
      })
    );
  });
});
