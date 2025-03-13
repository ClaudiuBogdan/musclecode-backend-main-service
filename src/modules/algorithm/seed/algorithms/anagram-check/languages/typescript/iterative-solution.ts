/**
 * Implements an iterative solution to check if two strings are anagrams.
 *
 * @param s1 - The first string.
 * @param s2 - The second string.
 * @returns true if s1 and s2 are anagrams, false otherwise.
 */
export function isAnagram(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;

  const count: { [key: string]: number } = {};

  for (const char of s1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (const char of s2) {
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }

  return true;
}
