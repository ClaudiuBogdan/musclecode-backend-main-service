/**
 * Implements the longest common subsequence algorithm using recursion with memoization.
 *
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns The length of the longest common subsequence.
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
  const memo: { [key: string]: number } = {};

  function lcs(i: number, j: number): number {
    if (i === text1.length || j === text2.length) return 0;
    const key = `${i},${j}`;
    if (memo.hasOwnProperty(key)) {
      return memo[key];
    }
    if (text1[i] === text2[j]) {
      memo[key] = 1 + lcs(i + 1, j + 1);
    } else {
      memo[key] = Math.max(lcs(i + 1, j), lcs(i, j + 1));
    }
    return memo[key];
  }

  return lcs(0, 0);
} 