import { linearSearch } from './exercise';

describe('Linear Search Algorithm', () => {
  describe('Basic Functionality', () => {
    it('should find element in the middle of the array', () => {
      expect(linearSearch([13, 9, 21, 15, 39, 19, 27], 21)).toBe(2);
    });

    it('should return -1 when element is not found', () => {
      expect(linearSearch([13, 9, 21, 15, 39, 19, 27], 99)).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array', () => {
      expect(linearSearch([], 1)).toBe(-1);
    });

    it('should handle array with a single element - found', () => {
      expect(linearSearch([5], 5)).toBe(0);
    });

    it('should handle array with a single element - not found', () => {
      expect(linearSearch([5], 3)).toBe(-1);
    });
  });

  describe('Large Arrays', () => {
    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      expect(linearSearch(largeArray, 500)).toBe(500);
    });
  });
});
