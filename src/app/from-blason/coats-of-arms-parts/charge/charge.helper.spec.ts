import { getChargePositions } from './charge.helper';

describe('getChargePositions', () => {
  it('should center element if there is one', () => {
    expect(getChargePositions(1)).toEqual({
      cellWidth: 1 / 3,
      positions: [[0.5, 0.5]],
    });
  });
  it('should center element if there is two', () => {
    expect(getChargePositions(2)).toEqual({
      cellWidth: 1 / 5,
      positions: [[0.3, 0.5], [0.7, 0.5]],
    });
  });
  it('should center element if there is three', () => {
    expect(getChargePositions(3)).toEqual({
      cellWidth: 1 / 5,
      positions: [[0.3, 0.25], [0.7, 0.25], [0.5, 0.625]],
    });
  });
  it('should center element if there is four', () => {
    expect(getChargePositions(4)).toEqual({
      cellWidth: 1 / 7,
      positions: [[1 / 7 + 1 / 14, 0.25], [0.5, 0.25], [5 / 7 + 1 / 14, 0.25], [0.5, 0.625]],
    });
  });

  it('should center element if there is nineteen', () => {
    expect(getChargePositions(19)).toEqual({
      cellWidth: 1 / 13,
      positions: [
        [0.11538461538461539, 0.1],
        [0.2692307692307692, 0.1],
        [0.4230769230769231, 0.1],
        [0.5769230769230769, 0.1],
        [0.7307692307692307, 0.1],
        [0.8846153846153846, 0.1],
        [0.19230769230769232, 0.25],
        [0.34615384615384615, 0.25],
        [0.5, 0.25],
        [0.6538461538461539, 0.25],
        [0.8076923076923077, 0.25],
        [0.2692307692307692, 0.4],
        [0.4230769230769231, 0.4],
        [0.5769230769230769, 0.4],
        [0.7307692307692307, 0.4],
        [0.34615384615384615, 0.55],
        [0.5, 0.55],
        [0.6538461538461539, 0.55],
        [0.5, 0.7],
      ],
    });
  });
});
