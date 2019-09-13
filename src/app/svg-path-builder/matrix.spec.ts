import fc from 'fast-check';
import { identity3, Matrix3, mul } from './matrix';

const numberArb = fc.double(-100, 100);
const matrixArb = fc.tuple(
  fc.tuple(numberArb, numberArb, numberArb),
  fc.tuple(numberArb, numberArb, numberArb),
  fc.tuple(numberArb, numberArb, numberArb)
);
const id = identity3();
describe('matrix', () => {
  describe('mul', () => {
    it('should have identity has neutral element', () => {
      fc.assert(
        fc.property(matrixArb, (matrix) => {
          expect(mul(matrix, id)).toEqual(matrix);
          expect(mul(id, matrix)).toEqual(matrix);
        })
      );
    });
    it('should return the expected value', () => {
      const m1: Matrix3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const m2: Matrix3 = [[10, 20, 30], [40, 50, 60], [70, 80, 90]];

      expect(mul(m1, m2)).toEqual([[300, 360, 420], [660, 810, 960], [1020, 1260, 1500]]);
    });
  });
});
