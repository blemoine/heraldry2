import fc from 'fast-check';
import { fieldArb, ordinaryArb } from '../model/tests/arbitraries';
import { decodeField, encodeField, decodeOrdinary, encodeOrdinary } from './blason-codec';

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
  describe('codec ordinary', () => {
    it('should be able to encode and decode null', () => {
      expect(decodeOrdinary(encodeOrdinary(null))).toEqual(null);
    });
    it('should be able to encode and decode without data loss', () => {
      fc.assert(
        fc.property(ordinaryArb, (ordinary) => {
          expect(decodeOrdinary(encodeOrdinary(ordinary))).toEqual(ordinary);
        }),
        { numRuns: 500 }
      );
    });
  });
});
