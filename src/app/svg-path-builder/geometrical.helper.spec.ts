import fc from 'fast-check';
import { pointBetween, pointOnLine } from './geometrical.helper';

describe('pointBetween', () => {
  it('should return the current point if the 2 points are the same', () => {
    fc.assert(
      fc.property(fc.tuple(fc.integer(), fc.integer()), (point) => {
        expect(pointBetween(point, point)).toEqual(point);
      })
    );
  });

  it('should return a point between the 2 points', () => {
    expect(pointBetween([1, 5], [5, 11])).toEqual([3, 8]);
  });
});

describe('pointOnLine', () => {
  it('should return the current point if the 2 points are the same', () => {
    fc.assert(
      fc.property(fc.tuple(fc.integer(), fc.integer()), fc.integer(), (point, percentage) => {
        expect(pointOnLine(point, point, percentage)).toEqual(point);
      })
    );
  });

  it('should return the first point if the percentage is 0 and the last point if the percentage is 100', () => {
    fc.assert(
      fc.property(fc.tuple(fc.integer(), fc.integer()), fc.tuple(fc.integer(), fc.integer()), (point, point2) => {
        expect(pointOnLine(point, point2, 0)).toEqual(point);
        expect(pointOnLine(point, point2, 100)).toEqual(point2);
      })
    );
  });

  it('should return a point between the 2 points', () => {
    expect(pointOnLine([1, 5], [5, 11], 25)).toEqual([2, 6.5]);
    expect(pointOnLine([1, 5], [5, 11], 75)).toEqual([4, 9.5]);
  });
});
