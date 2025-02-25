const { isAnagram } = require('./exercise');

describe('Anagram Check Algorithm', () => {
  test('should return true for anagrams', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
    expect(isAnagram('triangle', 'integral')).toBe(true);
  });

  test('should return false for non-anagrams', () => {
    expect(isAnagram('hello', 'world')).toBe(false);
    expect(isAnagram('abc', 'ab')).toBe(false);
  });

  test('should handle empty strings', () => {
    expect(isAnagram('', '')).toBe(true);
  });
});
