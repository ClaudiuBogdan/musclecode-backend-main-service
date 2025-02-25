/**
 * Implements the 0/1 Knapsack algorithm using a recursive approach with memoization.
 *
 * @param weights - Array of item weights.
 * @param values - Array of item values.
 * @param capacity - Maximum capacity of the knapsack.
 * @returns The maximum total value achievable.
 *
 * Time Complexity: Exponential without memoization, improved with memoization.
 */
export function knapsack01(
  weights: number[],
  values: number[],
  capacity: number,
): number {
  const n = weights.length;
  const memo: { [key: string]: number } = {};

  function helper(i: number, remaining: number): number {
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
