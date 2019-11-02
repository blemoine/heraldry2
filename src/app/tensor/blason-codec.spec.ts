import fc from 'fast-check';
import { blasonArb, chargeArb, fieldArb, ordinaryArb, tinctureArb } from '../model/tests/arbitraries';
import {
  decodeBlason,
  decodeCharge,
  decodeField,
  decodeOrdinary,
  decodeTincture,
  encodeBlason,
  encodeCharge,
  encodeField,
  encodeOrdinary,
  encodeTincture,
} from './blason-codec';

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
  describe('codec charge', () => {
    it('should be able to encode and decode null', () => {
      expect(decodeCharge(encodeCharge(null))).toEqual(null);
    });
    it('should be able to encode and decode without data loss', () => {
      fc.assert(
        fc.property(chargeArb, (charge) => {
          expect(decodeCharge(encodeCharge(charge))).toEqual(charge);
        }),
        { numRuns: 500 }
      );
    });
  });
  describe('codec blason', () => {
    it('should be able to encode and decode without data loss', () => {
      fc.assert(
        fc.property(blasonArb, (blason) => {
          expect(decodeBlason(encodeBlason(blason))).toEqual(blason);
        }),
        { numRuns: 500 }
      );
    });
  });

  describe('codec tincture', () => {
    it('should be able to encode and decode without data loss', () => {
      fc.assert(
        fc.property(tinctureArb, (tincture) => {
          expect(decodeTincture(encodeTincture(tincture))).toEqual(tincture);
        }),
        { numRuns: 500, seed: -1738182938, path: '0', endOnFailure: true }
      );
    });
  });
});
