const { longestCommonSubsequence } = require('./exercise');

describe('Longest Common Subsequence', () => {
  test('should return 3 for "abcde" and "ace"', () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
  });

  test('should return 3 for "abc" and "abc"', () => {
    expect(longestCommonSubsequence("abc", "abc")).toBe(3);
  });

  test('should return 0 for "abc" and "def"', () => {
    expect(longestCommonSubsequence("abc", "def")).toBe(0);
  });

  test('should handle empty string cases', () => {
    expect(longestCommonSubsequence("", "abc")).toBe(0);
    expect(longestCommonSubsequence("abc", "")).toBe(0);
  });
}); 