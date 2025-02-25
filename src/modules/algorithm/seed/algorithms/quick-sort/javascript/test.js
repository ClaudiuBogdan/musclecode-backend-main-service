const { quickSort } = require('./exercise');

describe('Quick Sort Algorithm', () => {
  test('should sort the array (example 1)', () => {
    const input = [20, 13, 3, 2, 10, 1, 5, 6];
    const expected = [1, 2, 3, 5, 6, 10, 13, 20];
    expect(quickSort(input)).toEqual(expected);
  });

  test('should sort the array (example 2)', () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 5];
    const expected = [5, 11, 12, 22, 25, 34, 64, 90];
    expect(quickSort(input)).toEqual(expected);
  });

  test('should handle empty array', () => {
    expect(quickSort([])).toEqual([]);
  });

  test('should handle single element', () => {
    expect(quickSort([42])).toEqual([42]);
  });
});
