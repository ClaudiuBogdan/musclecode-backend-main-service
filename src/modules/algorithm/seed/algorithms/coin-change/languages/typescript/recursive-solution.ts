/**
 * Implements the coin change algorithm using a recursive approach with memoization.
 *
 * @param coins - Array of coin denominations
 * @param amount - Total amount to form
 * @returns The minimum number of coins needed, or -1 if not possible
 */
export function coinChange(coins: number[], amount: number): number {
  const memo = new Map<number, number>();

  function helper(rem: number): number {
    if (rem < 0) return Infinity;
    if (rem === 0) return 0;
    if (memo.has(rem)) return memo.get(rem)!;

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
