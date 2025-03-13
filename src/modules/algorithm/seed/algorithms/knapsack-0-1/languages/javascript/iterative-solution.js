/**
 * Implements the 0/1 Knapsack algorithm using an iterative tabulation approach.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum capacity of the knapsack.
 * @returns {number} The maximum total value achievable.
 */
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1],
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

module.exports = { knapsack01 };
