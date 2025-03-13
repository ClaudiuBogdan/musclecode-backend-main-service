---
title: The Bottom-Up Dynamic Programming Approach
---

# 🏗️ Building the Solution: Bottom-Up DP Approach

In this lesson, we'll implement the dynamic programming solution for the 0/1 Knapsack problem using a bottom-up (tabulation) approach. This method builds a table from the ground up, solving all subproblems systematically.

## Bottom-Up vs. Top-Down 🔄

There are two main ways to implement dynamic programming:

1. **Top-Down (Memoization)**: Start with the original problem and recursively solve subproblems, storing results to avoid redundant calculations.
2. **Bottom-Up (Tabulation)**: Start with the smallest subproblems and iteratively build up to the original problem.

We'll focus on the bottom-up approach first, as it's generally more efficient and easier to visualize.

## Setting Up the DP Table 📋

As we discussed in the previous lesson, we'll use a 2D table to store the maximum value achievable for different combinations of items and capacities.

```
DP[i][w] = Maximum value with first i items and capacity w
```

Our table dimensions will be (n+1) × (W+1), where:
- n = number of items
- W = knapsack capacity

The extra row and column (hence the +1) account for the base cases where we have 0 items or 0 capacity.

## Step-By-Step Implementation 👣

Let's implement the algorithm in JavaScript:

```javascript
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // Build table DP[][] in bottom-up manner
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        // If current item can fit, decide whether to include it
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],  // Include item
          dp[i - 1][w]  // Exclude item
        );
      } else {
        // If current item cannot fit, exclude it
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity]; // Return the maximum value
}
```

## Tracing the Algorithm 🔍

Let's trace through the algorithm using our first example:

```
Items:
- Item 0: Weight = 2, Value = 3
- Item 1: Weight = 3, Value = 4
- Item 2: Weight = 4, Value = 5
- Item 3: Weight = 5, Value = 6

Knapsack capacity: 5
```

<details>
<summary>Step-by-step table construction</summary>

1. **Initialize the DP table**:
   ```
        Capacity (w)
        0  1  2  3  4  5
   Items 0  0  0  0  0  0  0
   (i)   1  0  ?  ?  ?  ?  ?
         2  0  ?  ?  ?  ?  ?
         3  0  ?  ?  ?  ?  ?
         4  0  ?  ?  ?  ?  ?
   ```

2. **Consider Item 0 (Weight=2, Value=3)**:
   - For w=0,1: Item doesn't fit, so DP[1][0]=0, DP[1][1]=0
   - For w=2: Item fits, max(0 + 3, 0) = 3, so DP[1][2]=3
   - For w=3,4,5: Item fits, max(0 + 3, 0) = 3, so DP[1][3]=3, DP[1][4]=3, DP[1][5]=3
   ```
        Capacity (w)
        0  1  2  3  4  5
   Items 0  0  0  0  0  0  0
   (i)   1  0  0  3  3  3  3
         2  0  ?  ?  ?  ?  ?
         3  0  ?  ?  ?  ?  ?
         4  0  ?  ?  ?  ?  ?
   ```

3. **Consider Item 1 (Weight=3, Value=4)**:
   - For w=0,1,2: Item doesn't fit, so DP[2][0]=0, DP[2][1]=0, DP[2][2]=3 (from previous row)
   - For w=3: Item fits, max(3 + 0, 3) = 4, so DP[2][3]=4
   - For w=4: Item fits, max(4 + 0, 3) = 4, so DP[2][4]=4
   - For w=5: Item fits, max(4 + 3, 3) = 7, so DP[2][5]=7
   ```
        Capacity (w)
        0  1  2  3  4  5
   Items 0  0  0  0  0  0  0
   (i)   1  0  0  3  3  3  3
         2  0  0  3  4  4  7
         3  0  ?  ?  ?  ?  ?
         4  0  ?  ?  ?  ?  ?
   ```

4. **Consider Item 2 (Weight=4, Value=5)**:
   - For w=0,1,2,3: Item doesn't fit, so DP[3][0]=0, DP[3][1]=0, DP[3][2]=3, DP[3][3]=4 (from previous row)
   - For w=4: Item fits, max(5 + 0, 4) = 5, so DP[3][4]=5
   - For w=5: Item fits, max(5 + 0, 7) = 7, so DP[3][5]=7
   ```
        Capacity (w)
        0  1  2  3  4  5
   Items 0  0  0  0  0  0  0
   (i)   1  0  0  3  3  3  3
         2  0  0  3  4  4  7
         3  0  0  3  4  5  7
         4  0  ?  ?  ?  ?  ?
   ```

5. **Consider Item 3 (Weight=5, Value=6)**:
   - For w=0,1,2,3,4: Item doesn't fit, so DP[4][0]=0, DP[4][1]=0, DP[4][2]=3, DP[4][3]=4, DP[4][4]=5 (from previous row)
   - For w=5: Item fits, max(6 + 0, 7) = 7, so DP[4][5]=7
   ```
        Capacity (w)
        0  1  2  3  4  5
   Items 0  0  0  0  0  0  0
   (i)   1  0  0  3  3  3  3
         2  0  0  3  4  4  7
         3  0  0  3  4  5  7
         4  0  0  3  4  5  7
   ```

6. **Final result**: DP[4][5] = 7

So the maximum value we can achieve is 7, which matches our expected answer.
</details>

## Finding the Selected Items 🔎

The DP table tells us the maximum value, but what if we want to know which items were selected? We can modify our algorithm to trace back through the table:

```javascript
function knapsack01WithItems(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // Build the table as before
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Find which items were selected
  const selectedItems = [];
  let w = capacity;
  
  for (let i = n; i > 0; i--) {
    // If this item was chosen
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1);  // Add the item's index
      w -= weights[i - 1];  // Reduce the capacity
    }
  }
  
  return {
    maxValue: dp[n][capacity],
    selectedItems: selectedItems.reverse()  // Reverse to get items in original order
  };
}
```

## Time and Space Complexity ⏱️

- **Time Complexity**: O(n × W) - We have two nested loops, one iterating through n items and the other through capacity 0 to W.
- **Space Complexity**: O(n × W) - We use a 2D table of size (n+1) × (W+1).

> [!NOTE]
> The knapsack problem is a classic example of a pseudo-polynomial time algorithm. While it's not polynomial in the input size (since W could be exponentially large compared to its digit length), it's polynomial in the numeric value of the capacity.

## Optimization: Space Complexity 💾

We can optimize the space complexity by observing that each row in the DP table only depends on the previous row. So instead of a 2D array, we can use a 1D array and update it in place:

```javascript
function knapsack01Optimized(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // Iterate from right to left to avoid using updated values
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}
```

This reduces the space complexity to O(W) while maintaining the same time complexity.

## Think About It 🧠

1. Why do we need to iterate from right to left in the space-optimized version?
2. How would the algorithm change if some items had weight 0?
3. What if the knapsack had to be filled to exactly capacity W, not just at most W?

In the next lesson, we'll explore the top-down (recursive with memoization) approach to the same problem and compare it with the bottom-up approach. 