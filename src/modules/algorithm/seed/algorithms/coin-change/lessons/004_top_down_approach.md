---
title: The Top-Down Approach
---

# 🔍 Solving Coin Change: The Top-Down Approach

## Top-Down Dynamic Programming with Memoization

In this lesson, we'll explore how to solve the Coin Change problem using a top-down approach with memoization, also known as recursive dynamic programming.

> [!NOTE]
> The top-down approach starts with the main problem, breaks it into subproblems, and uses recursion with memoization to avoid redundant calculations.

## Understanding the Recursive Approach

While the bottom-up approach builds solutions from smaller to larger subproblems, the top-down approach:

1. Starts with the original problem
2. Breaks it down recursively into smaller subproblems
3. Uses memoization to avoid recalculating solutions for the same subproblems

## Setting Up Our Solution

Let's tackle the same example:
- Coins: `[1, 2, 5]`
- Amount: `11`

### Step 1: Define the Recursive Function

We'll create a recursive function `minCoins` that calculates the minimum coins needed for a given amount:

```javascript
function minCoins(coins, amount) {
  // Base cases
  if (amount === 0) return 0;
  if (amount < 0) return Infinity;
  
  let minimum = Infinity;
  
  // Try each coin
  for (const coin of coins) {
    minimum = Math.min(minimum, minCoins(coins, amount - coin) + 1);
  }
  
  return minimum;
}
```

### Step 2: Understand the Recursion Tree

Let's visualize a small part of the recursion tree for calculating `minCoins(coins, 6)`:

```mermaid
graph TD
    A[minCoins(6)] --> B[minCoins(5) + 1]
    A --> C[minCoins(4) + 1]
    A --> D[minCoins(1) + 1]
    B --> E[minCoins(4) + 1]
    B --> F[minCoins(3) + 1]
    B --> G[minCoins(0) + 1]
    C --> H[minCoins(3) + 1]
    C --> I[minCoins(2) + 1]
    C --> J[minCoins(-1) + 1]
    
    style A fill:#f9d5e5
    style E fill:#eeac99,stroke-dasharray: 5 5
    style H fill:#eeac99,stroke-dasharray: 5 5
```

Notice how `minCoins(4)` and `minCoins(3)` appear multiple times in the recursion tree? This is where memoization becomes essential!

### Step 3: Add Memoization

Memoization allows us to remember the results of previous calculations. We'll use a Map (or object) to store the results:

```javascript
function coinChange(coins, amount) {
  // Create a memo map to store results
  const memo = new Map();
  
  function minCoins(remaining) {
    // Base cases
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    
    // Check if we've already calculated this
    if (memo.has(remaining)) {
      return memo.get(remaining);
    }
    
    let minimum = Infinity;
    
    // Try each coin
    for (const coin of coins) {
      minimum = Math.min(minimum, minCoins(remaining - coin) + 1);
    }
    
    // Store result in memo before returning
    memo.set(remaining, minimum);
    return minimum;
  }
  
  const result = minCoins(amount);
  return result === Infinity ? -1 : result;
}
```

## Tracing the Execution

Let's trace the execution for a small example to understand how memoization works:

<details>
<summary>Trace for coinChange([1, 2, 5], 6)</summary>

1. Call `minCoins(6)`
   - No memo for 6 yet
   - Try coin = 1: Call `minCoins(5)` + 1
     - No memo for 5 yet
     - Try coin = 1: Call `minCoins(4)` + 1
       - No memo for 4 yet
       - Try coin = 1: Call `minCoins(3)` + 1
         - No memo for 3 yet
         - Try coin = 1: Call `minCoins(2)` + 1
           - No memo for 2 yet
           - Try coin = 1: Call `minCoins(1)` + 1
             - No memo for 1 yet
             - Try coin = 1: Call `minCoins(0)` + 1 = 0 + 1 = 1
             - Try coin = 2: Call `minCoins(-1)` + 1 = ∞ (invalid)
             - Try coin = 5: Call `minCoins(-4)` + 1 = ∞ (invalid)
             - Memo[1] = 1
           - Try coin = 2: Call `minCoins(0)` + 1 = 0 + 1 = 1
           - Try coin = 5: Call `minCoins(-3)` + 1 = ∞ (invalid)
           - Memo[2] = 1
         - Try coin = 2: Call `minCoins(1)` + 1 = 1 + 1 = 2 (from memo)
         - Try coin = 5: Call `minCoins(-2)` + 1 = ∞ (invalid)
         - Memo[3] = 2
       - Try coin = 2: Call `minCoins(2)` + 1 = 1 + 1 = 2 (from memo)
       - Try coin = 5: Call `minCoins(-1)` + 1 = ∞ (invalid)
       - Memo[4] = 2
     - Try coin = 2: Call `minCoins(3)` + 1 = 2 + 1 = 3 (from memo)
     - Try coin = 5: Call `minCoins(0)` + 1 = 0 + 1 = 1
     - Memo[5] = 1
   - Try coin = 2: Call `minCoins(4)` + 1 = 2 + 1 = 3 (from memo)
   - Try coin = 5: Call `minCoins(1)` + 1 = 1 + 1 = 2 (from memo)
   - Memo[6] = 2

Final result = 2 coins (one 5-coin and one 1-coin)
</details>

Notice how we only calculate each `minCoins(n)` once and then reuse the result from our memo cache. This significantly improves the algorithm's efficiency!

## Visualizing the Memo Cache

As we calculate values, our memo cache gradually fills up:

| Amount | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----| 
| Memo   | 0 | 1 | 1 | 2 | 2 | 1 | 2 | 2 | 3 | 3 | 2  | 3  |

## Complete Top-Down Algorithm

Here's the complete top-down algorithm:

```javascript
function coinChange(coins, amount) {
  const memo = new Map();

  function minCoins(remaining) {
    if (remaining < 0) return Infinity;
    if (remaining === 0) return 0;
    if (memo.has(remaining)) return memo.get(remaining);

    let minimum = Infinity;
    for (const coin of coins) {
      minimum = Math.min(minimum, minCoins(remaining - coin) + 1);
    }
    
    memo.set(remaining, minimum);
    return minimum;
  }

  const result = minCoins(amount);
  return result === Infinity ? -1 : result;
}
```

## Analysis

- **Time Complexity**: O(amount × n), where n is the number of coins
  - We solve each subproblem (amount from 1 to the target) once
  - For each subproblem, we consider all n coins
  
- **Space Complexity**: O(amount)
  - We use a memo table of size O(amount)
  - Additionally, there's recursive call stack space of up to O(amount)

## Comparing Bottom-Up and Top-Down Approaches

| Aspect                  | Bottom-Up (Tabulation)                | Top-Down (Memoization)                |
|-------------------------|---------------------------------------|---------------------------------------|
| Direction               | Builds from smaller to larger problems | Starts from the main problem          |
| Implementation          | Iterative                             | Recursive                             |
| Ease of Understanding   | Might be harder to conceptualize      | Often more intuitive to understand    |
| Stack Overflow Risk     | No risk                               | Possible for very large inputs        |
| Overhead                | Less function call overhead           | More function call overhead           |
| Memory Usage            | Generally better                      | Extra stack space                     |
| Computation Pattern     | Solves all subproblems                | Solves only needed subproblems        |

> [!TIP]
> For the Coin Change problem, both approaches have the same time and space complexity, but the bottom-up approach is often preferred in practice due to its iterative nature and lack of recursion overhead.

## When to Choose Top-Down Over Bottom-Up

- 🧠 When the recursive solution is more intuitive and easier to understand
- 🛠️ When not all subproblems need to be solved
- 📝 When the state transitions are complex or have many dimensions
- 🔄 When the problem naturally lends itself to recursion

## Reflection Questions

<details>
<summary>What happens if we don't use memoization in our recursive solution?</summary>

Without memoization, we'd recalculate the same subproblems many times, leading to exponential time complexity O(n^amount) where n is the number of coins. This would be extremely inefficient and might cause a timeout for even moderately sized inputs.
</details>

<details>
<summary>Could we optimize our solution further?</summary>

Yes, some optimizations include:
- Sorting the coins in descending order (may help for some inputs)
- Early termination when we find a solution with just one coin
- Using a more efficient data structure for memoization
</details>

In the next lesson, we'll look at common real-world applications of the Coin Change algorithm, along with advanced variations and optimizations! 