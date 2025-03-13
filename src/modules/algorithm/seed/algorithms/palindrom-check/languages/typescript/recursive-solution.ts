/**
 * Recursive solution to check if a string is a palindrome.
 *
 * Preprocesses the string by removing non-alphanumeric characters and converting it to lowercase.
 * Then recursively compares characters using a helper function.
 *
 * @param s - The string to check.
 * @returns True if the string is a palindrome; false otherwise.
 */
export function isPalindrome(s: string): boolean {
  const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  function helper(left: number, right: number): boolean {
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
