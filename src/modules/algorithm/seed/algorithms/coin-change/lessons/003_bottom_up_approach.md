---
title: The Bottom-Up Approach
---

# 🏗️ Solving Coin Change: The Bottom-Up Approach

## Bottom-Up Dynamic Programming in Action

In this lesson, we'll solve the Coin Change problem using the bottom-up (tabulation) approach. This method is often more efficient and easier to implement for this specific problem.

> [!NOTE]
> The bottom-up approach starts by solving the smallest subproblems first and builds up to the final solution.

## Setting Up Our Solution

Let's revisit our example:
- Coins: `[1, 2, 5]`
- Amount: `11`

### Step 1: Define the DP Array

We'll create an array `dp` where:
- `dp[i]` = minimum number of coins needed to make amount `i`
- Our goal is to find `dp[amount]` (in this case, `dp[11]`)

```javascript
// Initialize an array of size (amount + 1)
const dp = new Array(amount + 1).fill(Infinity);

// Base case: it takes 0 coins to make amount 0
dp[0] = 0;
```

> [!TIP]
> We initialize all values to `Infinity` to represent "not possible yet" and then fill in the actual values as we find them.

### Step 2: Fill the Table Iteratively

Now, we'll iterate through each amount from 1 to 11 and for each amount, consider all the available coins.

```javascript
// For each amount from 1 to the target amount
for (let amount = 1; amount <= 11; amount++) {
  // Try each coin
  for (const coin of [1, 2, 5]) {
    // Check if we can use this coin (current amount - coin value >= 0)
    if (amount - coin >= 0) {
      // Update with the minimum
      dp[amount] = Math.min(dp[amount], dp[amount - coin] + 1);
    }
  }
}
```

### Step 3: Trace Through the Process

Let's see how our `dp` array evolves:

**Initial state:**
| Amount | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----| 
| Coins  | 0 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞  | ∞  |

<details>
<summary>For Amount = 1</summary>

Available coins: [1, 2, 5]

For coin = 1:
- Can we use this coin? 1 - 1 = 0 ✓
- Updated value: dp[1] = min(∞, dp[0] + 1) = min(∞, 0 + 1) = 1

For coin = 2:
- Can we use this coin? 1 - 2 = -1 ✗ (negative, can't use)

For coin = 5:
- Can we use this coin? 1 - 5 = -4 ✗ (negative, can't use)

Result for amount 1: 1 coin
</details>

**After processing amount 1:**
| Amount | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----| 
| Coins  | 0 | 1 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞  | ∞  |

<details>
<summary>For Amount = 2</summary>

Available coins: [1, 2, 5]

For coin = 1:
- Can we use this coin? 2 - 1 = 1 ✓
- Updated value: dp[2] = min(∞, dp[1] + 1) = min(∞, 1 + 1) = 2

For coin = 2:
- Can we use this coin? 2 - 2 = 0 ✓
- Updated value: dp[2] = min(2, dp[0] + 1) = min(2, 0 + 1) = 1

For coin = 5:
- Can we use this coin? 2 - 5 = -3 ✗ (negative, can't use)

Result for amount 2: 1 coin
</details>

**After processing amount 2:**
| Amount | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----| 
| Coins  | 0 | 1 | 1 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞  | ∞  |

Let's continue this process for a few more steps:

<details>
<summary>For Amount = 3</summary>

For coin = 1: dp[3] = min(∞, dp[2] + 1) = min(∞, 1 + 1) = 2
For coin = 2: dp[3] = min(2, dp[1] + 1) = min(2, 1 + 1) = 2
For coin = 5: Can't use (negative)

Result for amount 3: 2 coins
</details>

<details>
<summary>For Amount = 4</summary>

For coin = 1: dp[4] = min(∞, dp[3] + 1) = min(∞, 2 + 1) = 3
For coin = 2: dp[4] = min(3, dp[2] + 1) = min(3, 1 + 1) = 2
For coin = 5: Can't use (negative)

Result for amount 4: 2 coins
</details>

<details>
<summary>For Amount = 5</summary>

For coin = 1: dp[5] = min(∞, dp[4] + 1) = min(∞, 2 + 1) = 3
For coin = 2: dp[5] = min(3, dp[3] + 1) = min(3, 2 + 1) = 3
For coin = 5: dp[5] = min(3, dp[0] + 1) = min(3, 0 + 1) = 1

Result for amount 5: 1 coin
</details>

Let's jump ahead to see the complete table:

**Final DP Table:**
| Amount | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----| 
| Coins  | 0 | 1 | 1 | 2 | 2 | 1 | 2 | 2 | 3 | 3 | 2  | 3  |

> [!WARNING]
> Did you notice something? For amount 5, we can use a single 5-coin or use five 1-coins. The algorithm correctly chooses the minimum (1 coin).

## Visualizing the Solution

Let's visualize how amount 11 is calculated:

```mermaid
graph LR
    A[Amount: 11] --> B[Amount: 10 + 1 coin]
    A --> C[Amount: 9 + 1 coin]
    A --> D[Amount: 6 + 1 coin]
    B[dp[10] = 2] --> E[Total: 3 coins]
    C[dp[9] = 3] --> F[Total: 4 coins]
    D[dp[6] = 2] --> G[Total: 3 coins]
    E -- Min: 3 --> H[Final answer: 3 coins]
    G -- Min: 3 --> H
```

The solution is 3 coins (either 5+5+1 or 5+2+2+2).

## Complete Algorithm

Here's the complete bottom-up algorithm for Coin Change:

```javascript
function coinChange(coins, amount) {
  // Base case
  if (amount === 0) return 0;
  
  // Initialize DP array
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  // Fill the DP table bottom-up
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  // Return the result
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Analysis

- **Time Complexity**: O(amount × n), where n is the number of coins
  - We have two nested loops: one iterating through amounts (0 to amount)
  - The inner loop iterates through all coins
  
- **Space Complexity**: O(amount)
  - We use a single DP array of size (amount + 1)

## 💡 Key Insights

1. **State Definition**: `dp[i]` represents the minimum coins needed for amount `i`
2. **Base Case**: `dp[0] = 0` (0 coins needed for amount 0)
3. **Transition**: For each coin, we update `dp[i] = min(dp[i], dp[i - coin] + 1)`
4. **Final Answer**: `dp[amount]` gives us the minimum coins needed for our target amount

> [!TIP]
> The bottom-up approach avoids the overhead of recursive calls and potential stack overflow issues that might occur in the top-down approach for large inputs.

In the next lesson, we'll explore the top-down (recursive with memoization) approach for solving the same problem! 