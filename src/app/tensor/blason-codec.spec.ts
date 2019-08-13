import fc from 'fast-check';
import { fieldArb } from '../model/tests/arbitraries';
import { decodeField, encodeField } from './blason-codec';

describe('blason-codec', () => {
  describe('codec field', () => {
    it('should be able to encode and decode without data loss', () => {
      fc.assert(
        fc.property(fieldArb, (field) => {
          expect(decodeField(encodeField(field))).toEqual(field);
        }),
        { numRuns: 500 }
      );
    });
  });
});
