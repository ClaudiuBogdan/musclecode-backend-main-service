/**
 * Implements a recursive solution to check if two strings are anagrams.
 *
 * The algorithm removes the first character of s1 and then removes its first occurrence
 * in s2 before recursing.
 *
 * @param {string} s1 - The first string.
 * @param {string} s2 - The second string.
 * @returns {boolean} true if s1 and s2 are anagrams, false otherwise.
 */
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  if (s1 === '') return true;

  const char = s1[0];
  const index = s2.indexOf(char);
  if (index === -1) return false;

  const newS2 = s2.slice(0, index) + s2.slice(index + 1);
  return isAnagram(s1.slice(1), newS2);
}

module.exports = { isAnagram };
