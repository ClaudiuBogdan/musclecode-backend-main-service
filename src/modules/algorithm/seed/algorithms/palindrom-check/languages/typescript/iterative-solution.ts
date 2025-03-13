/**
 * Iterative solution to check if a string is a palindrome.
 * It preprocesses the string by removing non-alphanumeric characters and converting to lowercase,
 * then uses the two-pointer technique to compare characters.
 *
 * @param s - The string to check.
 * @returns True if the string is a palindrome; false otherwise.
 */
export function isPalindrome(s: string): boolean {
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
