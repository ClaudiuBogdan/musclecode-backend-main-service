/**
 * Iterative solution to check if a string is a palindrome.
 *
 * @param {string} s - The string to check.
 * @returns {boolean} True if the string is a palindrome; false otherwise.
 */
function isPalindrome(s) {
  const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = filtered.length - 1;

  while (left < right) {
    if (filtered[left] !== filtered[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

module.exports = { isPalindrome };
