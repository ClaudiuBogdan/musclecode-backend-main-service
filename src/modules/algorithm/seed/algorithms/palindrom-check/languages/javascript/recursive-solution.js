/**
 * Recursive solution to check if a string is a palindrome.
 *
 * @param {string} s - The string to check.
 * @returns {boolean} True if the string is a palindrome; false otherwise.
 */
function isPalindrome(s) {
  const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  function helper(left, right) {
    if (left >= right) {
      return true;
    }
    if (filtered[left] !== filtered[right]) {
      return false;
    }
    return helper(left + 1, right - 1);
  }

  return helper(0, filtered.length - 1);
}

module.exports = { isPalindrome };
