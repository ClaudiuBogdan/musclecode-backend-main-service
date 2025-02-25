/**
 * Implements the 0/1 Knapsack algorithm using an iterative tabulation approach.
 *
 * @param weights - Array of item weights.
 * @param values - Array of item values.
 * @param capacity - Maximum capacity of the knapsack.
 * @returns The maximum total value achievable.
 *
 * Time Complexity: O(n * capacity)
 * Space Complexity: O(n * capacity)
 */
export function knapsack01(
  weights: number[],
  values: number[],
  capacity: number,
): number {
  const n = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0),
  );

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
