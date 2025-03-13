---
title: The Brute Force Approach
---

# 💪 The Brute Force Approach: Checking All Pairs

> [!NOTE]
> In this lesson, we'll learn about the most straightforward way to solve the Two Sum problem.

## 🔄 What is a Brute Force Solution?

A brute force solution involves systematically checking every possible option until we find what we're looking for. It's like trying every key in a bunch until one unlocks the door.

## 🧮 The Brute Force Approach for Two Sum

For the Two Sum problem, the brute force approach involves checking every possible pair of numbers in the array to see if they add up to the target value.

Here's how it works:

1. We use two nested loops to check every possible pair of numbers
2. For each pair, we check if they add up to the target
3. If we find a pair that adds up to the target, we return their indices

## 📊 Visual Representation

Let's visualize this with an example: `nums = [2, 7, 11, 15]`, `target = 9`

```mermaid
graph TD
    A[Start] --> B[Check nums[0] + nums[1]]
    B -- "2 + 7 = 9 ✓" --> C[Found! Return [0, 1]]
    B -- "Not equal" --> D[Check nums[0] + nums[2]]
    D -- "2 + 11 != 9 ✗" --> E[Check nums[0] + nums[3]]
    E -- "2 + 15 != 9 ✗" --> F[Check nums[1] + nums[2]]
    F -- "7 + 11 != 9 ✗" --> G[Check nums[1] + nums[3]]
    G -- "7 + 15 != 9 ✗" --> H[Check nums[2] + nums[3]]
    H -- "11 + 15 != 9 ✗" --> I[No solution found]
```

In our example, we got lucky and found the answer in the very first check! But in the worst case, we might need to check all pairs.

## 💻 Code Implementation

Here's how the brute force approach looks in JavaScript:

```javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return undefined; // No solution found
}
```

Let's break down this code:

- The outer loop (`i`) iterates through each element in the array
- The inner loop (`j`) starts from `i + 1` to avoid using the same element twice and to avoid checking the same pair twice
- For each pair of indices `i` and `j`, we check if `nums[i] + nums[j] === target`
- If we find a match, we return the indices `[i, j]`
- If we check all pairs and don't find a match, we return `undefined` (though the problem states there is always one solution)

## ⏱️ Time and Space Complexity

> [!WARNING]
> While the brute force approach is easy to understand, it's not the most efficient solution.

### Time Complexity: O(n²)
- We have two nested loops, each potentially iterating through all n elements
- This means in the worst case, we check n * (n-1) / 2 pairs, which is O(n²)

### Space Complexity: O(1)
- We only use a constant amount of extra space, regardless of input size

## 🤔 Reflection

<details>
<summary>What are the advantages of the brute force approach?</summary>

- **Simplicity**: It's straightforward to understand and implement
- **Guaranteed to Find a Solution**: If there is a solution, the brute force approach will find it
- **Minimal Space Requirements**: It uses very little extra memory
</details>

<details>
<summary>What are the disadvantages of the brute force approach?</summary>

- **Inefficiency**: The time complexity of O(n²) makes it impractical for large arrays
- **Redundant Calculations**: We end up checking many pairs that we could potentially rule out with a smarter approach
</details>

## 🏋️‍♀️ Try It Yourself

Before moving on, try tracing through the brute force algorithm with this example:
```
nums = [3, 2, 4], target = 6
```

Can you determine which pairs will be checked and in what order? Which pair satisfies the target?

> [!TIP]
> It's often helpful to work through algorithms by hand with small examples to better understand how they work.

In the next lesson, we'll look at a more efficient approach using a hash map! 