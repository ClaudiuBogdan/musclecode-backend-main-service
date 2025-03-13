---
title: Implementing the Fractional Knapsack Algorithm
---

# Implementing the Fractional Knapsack Algorithm 💻

> [!NOTE]
> In this lesson, we'll implement the Fractional Knapsack algorithm step by step, exploring the code and the reasoning behind each part.

## Algorithm Pseudocode 📝

Let's start with a clear pseudocode representation of our algorithm:

```
function fractionalKnapsack(weights, values, capacity):
    1. Create an array of (weight, value) pairs with value-to-weight ratios
    2. Sort this array by value-to-weight ratio in descending order
    3. Initialize totalValue = 0 and remainingCapacity = capacity
    4. For each item in the sorted array:
        a. If remainingCapacity >= item weight:
           - Take the whole item
           - Add its value to totalValue
           - Subtract its weight from remainingCapacity
        b. Else:
           - Take a fraction (remainingCapacity/weight) of the item
           - Add the proportional value to totalValue
           - Set remainingCapacity to 0
           - Break the loop (knapsack is full)
    5. Return totalValue
```

## JavaScript Implementation 🚀

Now, let's implement this algorithm in JavaScript:

```javascript
/**
 * Implements the fractional knapsack algorithm using a greedy approach.
 *
 * @param {number[]} weights - An array of item weights
 * @param {number[]} values - An array of item values
 * @param {number} capacity - The knapsack capacity
 * @returns {number} The maximum value that can be carried in the knapsack
 */
function fractionalKnapsack(weights, values, capacity) {
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
```

## Code Walkthrough 🔍

> [!TIP]
> Understanding each step of the algorithm is crucial for mastering it!

Let's break down the implementation:

### 1. Calculating Value-to-Weight Ratios

```javascript
const items = weights.map((weight, index) => ({
  index,
  ratio: values[index] / weight,
}));
```

Here, we:
- Create an array of objects, each representing an item
- Store the original index (for accessing weight and value later)
- Calculate and store the value-to-weight ratio

### 2. Sorting Items by Ratio

```javascript
items.sort((a, b) => b.ratio - a.ratio);
```

This sorts the items in descending order of their value-to-weight ratio, putting the "most valuable per kg" items first.

### 3. Greedy Selection Process

```javascript
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
```

In this loop, we:
- Process items in order of decreasing value-to-weight ratio
- Take entire items as long as they fit
- When an item doesn't fit completely, take a fraction of it
- Once the knapsack is full, we break out of the loop

## Time and Space Complexity Analysis ⏱️

> [!NOTE]
> Understanding the efficiency of an algorithm is essential for assessing its practical utility.

- **Time Complexity**: O(n log n)
  - Creating the items array: O(n)
  - Sorting the items: O(n log n) ← This is the dominant operation
  - Processing the sorted items: O(n)
  - Overall: O(n log n)

- **Space Complexity**: O(n)
  - We create a new array to store the items with their ratios

## Edge Cases and Optimizations ⚡

> [!WARNING]
> Always handle edge cases to ensure your algorithm is robust!

Our implementation handles these edge cases:

1. **Empty input**: We check if the array length is zero
2. **Zero weights**: Technically, this could cause division by zero when calculating ratios
   - A proper implementation should check for zero weights

Potential optimizations:

1. **Early termination**: If the knapsack is filled completely, we can break the loop
2. **In-place sorting**: To reduce space complexity (though this would modify the input arrays)

## Visualizing the Process 📊

Let's trace through our example:

```mermaid
graph LR
    A[Input: weights=[10,20,30], values=[60,100,120], capacity=50] --> B[Calculate Ratios: 6, 5, 4]
    B --> C[Sort by Ratio: A(6), B(5), C(4)]
    C --> D[Take A: 10kg, $60]
    D --> E[Take B: 20kg, $100]
    E --> F[Take 2/3 of C: 20kg, $80]
    F --> G[Output: $240]
```

## Testing the Algorithm 🧪

Let's verify our implementation with a few test cases:

1. **Basic test**: weights=[10, 20, 30], values=[60, 100, 120], capacity=50
   - Expected output: 240

2. **Small capacity**: weights=[10, 20, 30], values=[60, 100, 120], capacity=5
   - Expected output: 30 (half of the first item)

3. **Large capacity**: weights=[10, 20, 30], values=[60, 100, 120], capacity=100
   - Expected output: 280 (all items)

4. **Empty input**: weights=[], values=[], capacity=50
   - Expected output: 0

## Challenge Yourself! 💪

> [!TIP]
> Practice by implementing variations of the Fractional Knapsack algorithm!

Try these exercises:
1. Modify the algorithm to return not just the total value, but also which fractions of each item were taken
2. Implement the algorithm in a different programming language
3. Handle the case where some items have zero weight (infinite ratio)
4. Optimize the memory usage of the algorithm

In the next lesson, we'll explore the comparison between Fractional Knapsack and 0-1 Knapsack, understanding when to use each variant! 