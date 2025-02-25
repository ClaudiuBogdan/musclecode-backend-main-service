import { mergeSort } from './exercise';

describe('Merge Sort Algorithm', () => {
  it('should sort [38,27,43,3,9,82,10]', () => {
    expect(mergeSort([38, 27, 43, 3, 9, 82, 10])).toEqual([
      3, 9, 10, 27, 38, 43, 82,
    ]);
  });

  it('should handle an empty array', () => {
    expect(mergeSort([])).toEqual([]);
  });

  it('should handle a single element array', () => {
    expect(mergeSort([5])).toEqual([5]);
  });

  it('should sort a small unsorted array', () => {
    expect(mergeSort([4, 1, 3, 2])).toEqual([1, 2, 3, 4]);
  });
});
