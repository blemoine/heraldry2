import { max } from './max';

describe('max', () => {
  it('should return null if the array is empty', () => {
    expect(max([])).toBe(null);
  });
  it('should return the greater number if the array is non empty', () => {
    expect(max([1, 23, 4, 5, 6])).toBe(23);
    expect(max([1, 23, 4, 5, 76])).toBe(76);
  });
});
