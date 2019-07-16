import { range } from './range';

describe('range', () => {
  it('should return an array of number between the 2 bounds', () => {
    const result = range(3, 5);

    expect(result).toEqual([3, 4]);
  });

  it('should return an empty array if the 2 bounds are equals', () => {
    const result = range(18, 18);

    expect(result).toEqual([]);
  });

  it('should return an empty array if the first bounds is bigger than the last', () => {
    const result = range(12, 4);

    expect(result).toEqual([]);
  });
});
