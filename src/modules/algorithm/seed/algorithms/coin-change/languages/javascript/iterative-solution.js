/**
 * Implements the coin change algorithm using an iterative dynamic programming approach.
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Total amount to form
 * @returns {number} Minimum number of coins needed, or -1 if not possible
 */
function coinChange(coins, amount) {
  if (amount === 0) return 0;
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

module.exports = { coinChange };
