/**
 * Implements the 0/1 Knapsack algorithm using a recursive approach with memoization.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum capacity of the knapsack.
 * @returns {number} The maximum total value achievable.
 */
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const memo = {};

  function helper(i, remaining) {
    if (i >= n || remaining <= 0) return 0;
    const key = `${i}-${remaining}`;
    if (memo[key] !== undefined) return memo[key];

    const without = helper(i + 1, remaining);
    let withItem = 0;
    if (weights[i] <= remaining) {
      withItem = values[i] + helper(i + 1, remaining - weights[i]);
    }
    memo[key] = Math.max(without, withItem);
    return memo[key];
  }

  return helper(0, capacity);
}

module.exports = { knapsack01 };
