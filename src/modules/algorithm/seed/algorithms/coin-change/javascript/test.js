const { coinChange } = require('./exercise');

describe('Coin Change Algorithm', () => {
  describe('Basic Functionality', () => {
    test('should return 3 for coins = [1, 2, 5] and amount = 11', () => {
      expect(coinChange([1, 2, 5], 11)).toBe(3);
    });

    test('should return -1 for coins = [2] and amount = 3', () => {
      expect(coinChange([2], 3)).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    test('should return 0 for amount = 0', () => {
      expect(coinChange([1, 2, 5], 0)).toBe(0);
    });

    test('should return -1 for empty coins array and non-zero amount', () => {
      expect(coinChange([], 10)).toBe(-1);
    });
  });
});
