const { isPalindrome } = require('./exercise');

describe('Palindrome Check Algorithm', () => {
  test('should return true for a simple palindrome', () => {
    expect(isPalindrome('madam')).toBe(true);
  });

  test('should return true for an odd-length palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('should return false for a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('should ignore case, spaces, and non-alphanumeric characters', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('should return true for an empty string', () => {
    expect(isPalindrome('')).toBe(true);
  });
});
