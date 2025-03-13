const { mergeSort } = require('./exercise');

describe('Merge Sort Algorithm', () => {
  test('should sort [38,27,43,3,9,82,10]', () => {
    expect(mergeSort([38, 27, 43, 3, 9, 82, 10])).toEqual([
      3, 9, 10, 27, 38, 43, 82,
    ]);
  });

  test('should handle an empty array', () => {
    expect(mergeSort([])).toEqual([]);
  });

  test('should handle a single element array', () => {
    expect(mergeSort([5])).toEqual([5]);
  });

  test('should sort a small unsorted array', () => {
    expect(mergeSort([4, 1, 3, 2])).toEqual([1, 2, 3, 4]);
  });
});
