import fc from 'fast-check';
import { parseBlason } from './blasonParser';
import { blasonArb } from '../model/tests/arbitraries';
import { stringifyBlason } from '../model/stringify/stringify.helper';

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
