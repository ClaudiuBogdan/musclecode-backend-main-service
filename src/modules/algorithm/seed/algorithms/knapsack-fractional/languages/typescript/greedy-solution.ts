/**
 * Implements the fractional knapsack algorithm using a greedy approach.
 *
 * @param weights - An array of item weights
 * @param values - An array of item values
 * @param capacity - The knapsack capacity
 * @returns The maximum value that can be carried in the knapsack
 *
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) for storing items with indices and ratios
 */
export function fractionalKnapsack(
  weights: number[],
  values: number[],
  capacity: number,
): number {
  const n = weights.length;
  if (n === 0) return 0;

  // Create items array with value-to-weight ratio
  const items = weights.map((weight, index) => ({
    index,
    ratio: values[index] / weight,
  }));

  // Sort items by value-to-weight ratio in descending order
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;

  for (const item of items) {
    const weight = weights[item.index];
    const value = values[item.index];

    if (remainingCapacity >= weight) {
      // Take the whole item
      totalValue += value;
      remainingCapacity -= weight;
    } else {
      // Take a fraction of the item
      const fraction = remainingCapacity / weight;
      totalValue += value * fraction;
      break; // Knapsack is full
    }
  }

  return totalValue;
}
