import fc from 'fast-check';
import { stringifyBlason } from '../from-blason/blason.helpers';
import { parseBlason } from './blasonParser';
import { blasonArb } from '../model/tests/arbitraries';

const numRuns = process.env.GENERATOR_CASE_COUNT ? parseFloat(process.env.GENERATOR_CASE_COUNT) : 100;

describe('parseBlason and stringify', () => {
  it('should be invert of each other', () => {
    fc.assert(
      fc.property(blasonArb, (blason) => {
        expect(parseBlason(stringifyBlason(blason))).toEqual(blason);
      }),
      { numRuns }
    );
  });
});
