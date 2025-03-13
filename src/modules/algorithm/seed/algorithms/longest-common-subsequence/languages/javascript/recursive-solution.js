/**
 * Implements the longest common subsequence algorithm using recursion with memoization.
 *
 * @param {string} text1 - First string.
 * @param {string} text2 - Second string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequence(text1, text2) {
  const memo = {};

  function lcs(i, j) {
    if (i === text1.length || j === text2.length) return 0;
    const key = i + ',' + j;
    if (memo.hasOwnProperty(key)) return memo[key];
    if (text1[i] === text2[j]) {
      memo[key] = 1 + lcs(i + 1, j + 1);
    } else {
      memo[key] = Math.max(lcs(i + 1, j), lcs(i, j + 1));
    }
    return memo[key];
  }

  return lcs(0, 0);
}

module.exports = { longestCommonSubsequence }; 