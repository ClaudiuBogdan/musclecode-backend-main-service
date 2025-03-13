/**
 * Implements the longest common subsequence algorithm using an iterative dynamic programming approach.
 *
 * @param {string} text1 - First string.
 * @param {string} text2 - Second string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

module.exports = { longestCommonSubsequence }; 