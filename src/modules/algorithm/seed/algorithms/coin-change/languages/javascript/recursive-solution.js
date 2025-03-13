/**
 * Implements the coin change algorithm using a recursive approach with memoization.
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Total amount to form
 * @returns {number} Minimum number of coins needed, or -1 if not possible
 */
function coinChange(coins, amount) {
  const memo = new Map();

  function helper(rem) {
    if (rem < 0) return Infinity;
    if (rem === 0) return 0;
    if (memo.has(rem)) return memo.get(rem);

    let minCoins = Infinity;
    for (const coin of coins) {
      minCoins = Math.min(minCoins, helper(rem - coin) + 1);
    }
    memo.set(rem, minCoins);
    return minCoins;
  }

  const result = helper(amount);
  return result === Infinity ? -1 : result;
}

module.exports = { coinChange };
