import { getChargePositions } from './charge.helper';

describe('getChargePositions', () => {
  it('should center element if there is one', () => {
    expect(getChargePositions(1, 'default')).toEqual({
      cellWidth: 1 / 3,
      cellHeight: 1,
      positions: [[0.5, 0.5]],
    });
  });
  it('should center element if there is two', () => {
    expect(getChargePositions(2, 'default')).toEqual({
      cellWidth: 1 / 5,
      cellHeight: 1,
      positions: [[0.3, 0.5], [0.7, 0.5]],
    });
  });
  it('should center element if there is three', () => {
    expect(getChargePositions(3, 'default')).toEqual({
      cellWidth: 1 / 5,
      cellHeight: 1 / 2,
      positions: [[0.3, 0.25], [0.7, 0.25], [0.5, 0.75]],
    });
  });
  it('should center element if there is four', () => {
    expect(getChargePositions(4, 'default')).toEqual({
      cellWidth: 1 / 7,
      cellHeight: 1 / 2,
      positions: [[1 / 7 + 1 / 14, 0.25], [0.5, 0.25], [5 / 7 + 1 / 14, 0.25], [0.5, 0.75]],
    });
  });

  it('should center element if there is nineteen', () => {
    expect(getChargePositions(19, 'default')).toEqual({
      cellWidth: 1 / 13,
      cellHeight: 1 / 5,
      positions: [
        [0.11538461538461539, 0.1],
        [0.2692307692307692, 0.1],
        [0.4230769230769231, 0.1],
        [0.5769230769230769, 0.1],
        [0.7307692307692307, 0.1],
        [0.8846153846153846, 0.1],
        [0.19230769230769232, 0.3],
        [0.34615384615384615, 0.3],
        [0.5, 0.3],
        [0.6538461538461539, 0.3],
        [0.8076923076923077, 0.3],
        [0.2692307692307692, 0.5],
        [0.4230769230769231, 0.5],
        [0.5769230769230769, 0.5],
        [0.7307692307692307, 0.5],
        [0.34615384615384615, 0.7],
        [0.5, 0.7],
        [0.6538461538461539, 0.7],
        [0.5, 0.9],
      ],
    });
  });

  it('should display the number of element in pale', () => {
    expect(getChargePositions(5, 'pale')).toEqual({
      cellWidth: 1 / 3,
      cellHeight: 1 / 5,
      positions: [[0.5, 0.1], [0.5, 0.3], [0.5, 0.5], [0.5, 0.7], [0.5, 0.9]],
    });
  });

  it('should display the number of element in fess', () => {
    expect(getChargePositions(4, 'fess')).toEqual({
      cellWidth: 1 / 9,
      cellHeight: 1,
      positions: [[3 / 18, 0.5], [7 / 18, 0.5], [11 / 18, 0.5], [15 / 18, 0.5]],
    });
  });
});
