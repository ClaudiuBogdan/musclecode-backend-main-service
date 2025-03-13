const { insertionSort } = require('./exercise');

describe('Insertion Sort Algorithm', () => {
  test('should sort the array [29, 10, 14, 37, 14] correctly', () => {
    expect(insertionSort([29, 10, 14, 37, 14])).toEqual([10, 14, 14, 29, 37]);
  });

  test('should sort the array [6, 2, 10, 7] correctly', () => {
    expect(insertionSort([6, 2, 10, 7])).toEqual([2, 6, 7, 10]);
  });

  test('should handle an empty array', () => {
    expect(insertionSort([])).toEqual([]);
  });

  test('should handle a single element array', () => {
    expect(insertionSort([5])).toEqual([5]);
  });
});
