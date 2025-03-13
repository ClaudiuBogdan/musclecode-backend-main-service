---
title: Understanding the 0/1 Knapsack Problem
---

# 🎒 The 0/1 Knapsack Problem

## What is the 0/1 Knapsack Problem? 🤔

Imagine you're a treasure hunter with a backpack that can only hold a limited weight. You've discovered various treasures, each with its own weight and value. Your goal? Fill your backpack to maximize the total value without exceeding its weight capacity.

> [!NOTE]
> The "0/1" in the name refers to the fact that you must either take an item completely (1) or leave it behind (0). You cannot take a fraction of an item.

## Real-world Applications 🌍

The 0/1 Knapsack problem appears in many real-life scenarios:

- 💼 **Business investment decisions**: Which projects to fund with a limited budget
- 🚚 **Cargo loading**: How to load a truck to maximize value
- 💻 **Computing resources**: Allocating memory to processes
- 📊 **Portfolio optimization**: Selecting investments with the best returns

## The Problem Formally Stated 📝

Given:
- A set of `n` items, each with:
  - A weight `w[i]`
  - A value `v[i]`
- A knapsack with capacity `W`

Find:
- Which items to include in the knapsack so that:
  - The total weight does not exceed `W`
  - The total value is maximized

## Simple Examples 🔍

### Example 1

```
Items:
- Item 0: Weight = 2, Value = 3
- Item 1: Weight = 3, Value = 4
- Item 2: Weight = 4, Value = 5
- Item 3: Weight = 5, Value = 6

Knapsack capacity: 5
```

<details>
<summary>What would be the optimal solution?</summary>

The optimal solution is to take Item 0 (weight 2, value 3) and Item 1 (weight 3, value 4).
- Total weight: 2 + 3 = 5 (exactly at capacity)
- Total value: 3 + 4 = 7
</details>

### Example 2

```
Items:
- Item 0: Weight = 8, Value = 50
- Item 1: Weight = 2, Value = 150
- Item 2: Weight = 6, Value = 210
- Item 3: Weight = 1, Value = 30

Knapsack capacity: 10
```

<details>
<summary>Can you figure out the optimal solution?</summary>

The optimal solution is to take Item 1 (weight 2, value 150), Item 2 (weight 6, value 210), and Item 3 (weight 1, value 30).
- Total weight: 2 + 6 + 1 = 9 (under capacity)
- Total value: 150 + 210 + 30 = 390
</details>

## Think About It 🧠

Before we dive into solving this problem, consider:

1. Why can't we just select items with the highest value first?
2. What if we select items with the highest value-to-weight ratio first?
3. Could either of these "greedy" approaches guarantee the optimal solution?

> [!TIP]
> Try solving the examples above using different strategies. Does picking the most valuable items first always work? What about picking the items with the best value-to-weight ratio?

In the next lesson, we'll explore these intuitive approaches and understand their limitations. 