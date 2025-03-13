---
title: Understanding the Coin Change Problem
---

# 💰 The Coin Change Problem

## What is the Coin Change Problem?

> [!NOTE]
> The Coin Change problem is a classic example of dynamic programming and optimization in computer science.

Imagine you're at a vending machine and you need to pay a specific amount, but you want to use the **fewest coins possible**. That's essentially what the Coin Change problem asks us to solve!

## Problem Statement

Given:
- An array of integers `coins` representing different coin denominations
- A target amount of money `amount`

Your task is to determine the **minimum number of coins** needed to make up the target amount. If it's not possible to make the amount with the available coins, you should return `-1`.

### Assumptions
- You have an **infinite supply** of each type of coin
- All amounts are integers (no fractional coins)
- Coins can be used multiple times

## Examples

### Example 1

```
Input: coins = [1, 2, 5], amount = 11
Output: 3
```

**Explanation:** 11 = 5 + 5 + 1, using a total of 3 coins.

### Example 2

```
Input: coins = [2], amount = 3
Output: -1
```

**Explanation:** It's impossible to make 3 using only coins of value 2.

### Example 3

```
Input: coins = [1], amount = 0
Output: 0
```

**Explanation:** No coins needed to make 0 amount.

## Why is this Problem Important?

> [!TIP]
> The Coin Change problem is more than just a theoretical exercise. It has real-world applications!

- 💵 **ATMs** and **cash registers** use similar algorithms to dispense the minimum number of bills/coins
- 🎮 **Game development** for in-game economy systems
- 📱 **Financial apps** for optimizing payment methods
- 📚 **Education** as a fundamental example of dynamic programming

## Think About It

Before diving into the solution, consider these questions:

<details>
<summary>What if we always choose the largest coin first? Would that work?</summary>

This approach, known as the "greedy algorithm," doesn't always work for the Coin Change problem. 

Consider coins = [1, 3, 4] and amount = 6:
- Greedy approach: Start with 4, then add two 1s = 3 coins
- Optimal solution: Two 3s = 2 coins
</details>

<details>
<summary>What makes this problem suitable for dynamic programming?</summary>

The Coin Change problem has:
1. **Optimal substructure**: The solution to the larger problem can be built from solutions to smaller subproblems
2. **Overlapping subproblems**: The same subproblems are solved multiple times
</details>

In the next sections, we'll explore how to approach this problem step-by-step, building towards an efficient solution!

![Coin Change Visualization](https://mermaid.ink/img/pako:eNptkMsKwjAQRX8lzKqCfoC7gpsudOXazeShdYzNg2RaEfHfTdOKonGW594zczMHtNYRLGDnXWPJIVlZu7N01vEiO6VLdfQuJKvMuSx1X_RYJO_IKXsW7Vb0VJAaTvr8DYU-GRxg4rCRrTN6DxdZT87WTzLq4P8YteyMehFUqnGWlv_stGE8ZzSCxZ55sEZC49XD0rQHQqKtDokhRK_qGCbhG5MhDPqk1bixZBM8v8UlXKmgQ2hJXXE4rXF5A7ucaZ4?type=png)

In the next lesson, we'll understand the foundation of our solution by exploring dynamic programming and its application to the Coin Change problem. 