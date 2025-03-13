const { bubbleSort } = require('./exercise');

describe('Bubble Sort Algorithm', () => {
  test('should sort the array [5,1,8,4,2] to [1,2,4,5,8]', () => {
    expect(bubbleSort([5, 1, 8, 4, 2])).toEqual([1, 2, 4, 5, 8]);
  });

  test('should sort the array [29,10,14,37,14] to [10,14,14,29,37]', () => {
    expect(bubbleSort([29, 10, 14, 37, 14])).toEqual([10, 14, 14, 29, 37]);
  });

  test('should handle an already sorted array', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle an empty array', () => {
    expect(bubbleSort([])).toEqual([]);
  });
}); 