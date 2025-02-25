import { binarySearch } from './exercise';

describe('Binary Search Algorithm', () => {
  describe('Basic Functionality', () => {
    it('should find element in the middle of the array', () => {
      expect(binarySearch([-1, 0, 2, 4, 6, 8], 4)).toBe(3);
    });

    it('should find element at the beginning of the array', () => {
      expect(binarySearch([-1, 0, 2, 4, 6, 8], -1)).toBe(0);
    });

    it('should find element at the end of the array', () => {
      expect(binarySearch([-1, 0, 2, 4, 6, 8], 8)).toBe(5);
    });

    it('should return -1 when element is not found', () => {
      expect(binarySearch([-1, 0, 2, 4, 6, 8], 3)).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array', () => {
      expect(binarySearch([], 1)).toBe(-1);
    });

    it('should handle array with single element - found', () => {
      expect(binarySearch([1], 1)).toBe(0);
    });

    it('should handle array with single element - not found', () => {
      expect(binarySearch([1], 2)).toBe(-1);
    });

    it('should handle array with two elements - found first', () => {
      expect(binarySearch([1, 2], 1)).toBe(0);
    });

    it('should handle array with two elements - found second', () => {
      expect(binarySearch([1, 2], 2)).toBe(1);
    });
  });

  describe('Large Numbers and Boundaries', () => {
    it('should handle array with large numbers', () => {
      expect(binarySearch([1000000, 2000000, 3000000], 2000000)).toBe(1);
    });

    it('should handle array with negative numbers', () => {
      expect(binarySearch([-5000, -3000, -1000, 0, 1000], -3000)).toBe(1);
    });
  });

  describe('Additional Coverage', () => {
    it('should handle even-length arrays', () => {
      expect(binarySearch([1, 3, 5, 7, 9, 11], 7)).toBe(3);
    });

    it('should handle odd-length arrays', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 3)).toBe(1);
    });

    it('should find elements in left half', () => {
      expect(binarySearch([1, 2, 3, 4, 5], 2)).toBe(1);
    });

    it('should find elements in right half', () => {
      expect(binarySearch([1, 2, 3, 4, 5], 4)).toBe(3);
    });

    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000000 }, (_, i) => i);
      expect(binarySearch(largeArray, 999999)).toBe(999999);
    });

    it('should handle negative numbers', () => {
      expect(binarySearch([-10, -5, 0, 5, 10], -5)).toBe(1);
    });
  });
});
