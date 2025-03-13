/**
 * Implements an iterative solution to check if two strings are anagrams.
 *
 * @param {string} s1 - The first string.
 * @param {string} s2 - The second string.
 * @returns {boolean} true if s1 and s2 are anagrams, false otherwise.
 */
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;

  const count = {};
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of s2) {
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }

  return true;
}

module.exports = { isAnagram };
