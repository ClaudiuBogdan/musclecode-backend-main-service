/**
 * Implements a recursive solution to check if two strings are anagrams.
 *
 * This implementation removes the first character from s1 and its corresponding
 * occurrence in s2 recursively.
 *
 * @param s1 - The first string.
 * @param s2 - The second string.
 * @returns true if s1 and s2 are anagrams, false otherwise.
 */
export function isAnagram(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;
  if (s1 === '') return true;

  const char = s1[0];
  const index = s2.indexOf(char);
  if (index === -1) return false;

  return isAnagram(s1.slice(1), s2.slice(0, index) + s2.slice(index + 1));
}
