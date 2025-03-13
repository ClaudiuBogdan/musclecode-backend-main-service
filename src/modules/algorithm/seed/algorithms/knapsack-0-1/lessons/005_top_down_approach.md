---
title: The Top-Down Recursive Approach with Memoization
---

# 🔍 Solving Recursively: Top-Down DP Approach

In the previous lesson, we implemented the 0/1 Knapsack algorithm using a bottom-up approach. Now, let's explore the top-down approach with memoization. This method starts with the original problem and recursively breaks it down into subproblems, storing results to avoid redundant calculations.

## Understanding Recursion with Memoization 🧠

Recursion naturally follows the way we think about problems: "To solve the problem with n items, first solve it with n-1 items, then add one more decision." However, naive recursion leads to exponential time complexity due to solving the same subproblems repeatedly.

Memoization is the technique of storing the results of expensive function calls to avoid recalculating them. It turns an exponential algorithm into a polynomial one.

> [!TIP]
> Think of memoization as "remember what you've already solved." Instead of recalculating, just look up the answer in your memory.

## The Recursive Formula 📝

Let's define our recursive function:

```
knapsack(i, w) = Maximum value that can be obtained using first i items with capacity w
```

For each item i and capacity w, we make a binary choice:
1. Don't take item i: `knapsack(i-1, w)`
2. Take item i (if possible): `values[i] + knapsack(i-1, w-weights[i])`

We return the maximum of these two choices.

## Implementing the Top-Down Approach 🛠️

Here's how we can implement the top-down approach with memoization in JavaScript:

```javascript
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  // Object to store previously calculated results
  const memo = {};
  
  function helper(i, remaining) {
    // Base cases
    if (i >= n || remaining <= 0) return 0;
    
    // Create a unique key for this subproblem
    const key = `${i}-${remaining}`;
    
    // If we've already solved this subproblem, return the cached result
    if (memo[key] !== undefined) return memo[key];
    
    // Option 1: Skip the current item
    const without = helper(i + 1, remaining);
    
    // Option 2: Include the current item (if it fits)
    let withItem = 0;
    if (weights[i] <= remaining) {
      withItem = values[i] + helper(i + 1, remaining - weights[i]);
    }
    
    // Store the better option in our memo
    memo[key] = Math.max(without, withItem);
    
    return memo[key];
  }
  
  return helper(0, capacity);
}
```

## Tracing the Recursion 🔄

Let's trace through our recursive approach with a smaller example for clarity:

```
Items:
- Item 0: Weight = 2, Value = 3
- Item 1: Weight = 3, Value = 4

Knapsack capacity: 5
```

<details>
<summary>Click to see the recursive trace</summary>

```
Call: helper(0, 5)
  - without = helper(1, 5)
    - without = helper(2, 5) 
      - Base case: i >= n, returns 0
    - withItem = values[1] + helper(2, 5-3) = 4 + helper(2, 2) 
      - Base case: i >= n, returns 0
    - Returns max(0, 4) = 4
  - withItem = values[0] + helper(1, 5-2) = 3 + helper(1, 3)
    - without = helper(2, 3) 
      - Base case: i >= n, returns 0
    - withItem = values[1] + helper(2, 3-3) = 4 + helper(2, 0) 
      - Base case: remaining <= 0, returns 0
    - Returns max(0, 4) = 4
  - Returns max(4, 3+4) = 7
```

The final answer is 7, which matches our expected result.

Notice how without memoization, we would recalculate `helper(2, 5)` and other overlapping subproblems multiple times. With memoization, we calculate each subproblem exactly once.
</details>

## Alternative Implementation Using a 2D Array 📊

Instead of using an object for memoization, we can also use a 2D array. This approach is more similar to the bottom-up table:

```javascript
function knapsack01WithArray(weights, values, capacity) {
  const n = weights.length;
  // -1 indicates 'not calculated yet'
  const dp = Array.from({ length: n }, () => Array(capacity + 1).fill(-1));
  
  function helper(i, remaining) {
    // Base cases
    if (i >= n || remaining <= 0) return 0;
    
    // If we've already solved this subproblem, return the cached result
    if (dp[i][remaining] !== -1) return dp[i][remaining];
    
    // Option 1: Skip the current item
    const without = helper(i + 1, remaining);
    
    // Option 2: Include the current item (if it fits)
    let withItem = 0;
    if (weights[i] <= remaining) {
      withItem = values[i] + helper(i + 1, remaining - weights[i]);
    }
    
    // Store the better option in our dp array
    dp[i][remaining] = Math.max(without, withItem);
    
    return dp[i][remaining];
  }
  
  return helper(0, capacity);
}
```

## Time and Space Complexity Analysis ⏱️

- **Time Complexity**: O(n × W) - We have at most n × W unique subproblems, and each takes O(1) time to solve once memoized.
- **Space Complexity**: O(n × W) - For the memoization table, plus O(n) additional space for the recursion stack.

## Comparing Bottom-Up and Top-Down Approaches 🔄

Both approaches solve the same problem and have the same asymptotic time and space complexity, but they differ in several ways:

| Aspect | Bottom-Up (Tabulation) | Top-Down (Memoization) |
|--------|------------------------|------------------------|
| Direction | Builds from smallest subproblems | Starts with the original problem |
| Computation | Computes all values in the DP table | Only computes needed values |
| Memory usage | Uses memory for all subproblems | Only uses memory for visited states |
| Stack usage | No recursion stack | Uses recursion stack |
| Implementation | Usually uses nested loops | Usually uses recursion |
| Speed | Generally faster in practice | May have overhead from function calls |
| Cache benefits | Better cache locality | Less predictable memory access |

## When to Choose Each Approach 🤔

- **Choose Bottom-Up when**:
  - You need to compute all subproblems anyway
  - You want to avoid recursion stack overflow
  - Performance is critical
  - Space optimization techniques can be applied

- **Choose Top-Down when**:
  - Only a small subset of subproblems need to be solved
  - The state transition is complex
  - The recursive solution is more intuitive
  - You want a quicker implementation

## Think About It 🧠

1. For our knapsack problem, do we always need to compute all subproblems, or are there cases where top-down would be more efficient?
2. How would you modify the top-down approach to also return the selected items?
3. Can you think of a scenario where the space optimization techniques we discussed for bottom-up wouldn't work for top-down?

In the next lesson, we'll explore variations of the knapsack problem and how our solution can be adapted. 