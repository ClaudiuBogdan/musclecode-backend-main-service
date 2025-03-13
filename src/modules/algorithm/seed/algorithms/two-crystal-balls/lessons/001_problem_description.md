---
title: Understanding the Two Crystal Balls Problem
---

# 🔮 The Two Crystal Balls Problem

> [!NOTE]
> This lesson introduces the Two Crystal Balls problem, a fascinating optimization challenge that demonstrates efficient algorithmic thinking.

## 🧩 The Problem Statement

Imagine you are in a building with **n** floors and you have **two identical crystal balls**. These crystal balls have a special property - if dropped from a certain height (or floor), they will break. If dropped from a height below that, they will remain intact.

The challenge is:

**Given two crystal balls that will break if dropped from a high enough distance, determine the exact floor at which they will break in the most optimized way.**

### Key Constraints:
- If a ball breaks when dropped from floor X, it will also break when dropped from any floor higher than X.
- If a ball doesn't break from floor X, it won't break from any floor lower than X.
- You must minimize the number of drops required in the worst-case scenario.
- You have exactly two balls - no more, no less.

## 🌟 Examples to Clarify

### Example 1
```
Input: [false, false, false, false, true, true, true]
Output: 4
```

In this example, each index represents a floor (starting from 0). The value `false` means a ball won't break if dropped from that floor, while `true` means it will break.

So here, balls start breaking from the 5th floor (index 4). The algorithm should return 4 as the answer.

### Example 2
```
Input: [false, false, false, false, false, false, false]
Output: -1
```

In this case, the balls never break, even from the highest floor. The algorithm should return -1 to indicate this.

## 🤔 Why Is This Interesting?

This problem is fascinating because:

1. It challenges our intuition about search algorithms
2. It demonstrates how constraints (having only two balls) change our approach
3. It shows how mathematical thinking can lead to elegant solutions

> [!TIP]
> Take a moment to think about how you would solve this. What's your first instinct? Would you start from the bottom and work your way up? Or would you try a different approach?

<details>
<summary>Thinking about the challenge...</summary>

If we had just one ball, we'd have to start from the lowest floor and move up one by one (linear search).

If we had unlimited balls, we could use binary search to find the answer quickly.

But with exactly two balls, we need a different strategy. The optimal solution is surprising and elegant!
</details>

In the next lesson, we'll explore naive approaches to solving this problem and understand why they aren't optimal. 