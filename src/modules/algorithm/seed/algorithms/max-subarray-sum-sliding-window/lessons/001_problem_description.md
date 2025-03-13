---
title: Understanding the Maximum Sum Subarray Problem
---

# 🧩 The Maximum Sum Subarray Problem

> [!NOTE]
> This lesson introduces the problem of finding the maximum sum of a contiguous subarray of fixed size using the sliding window technique.

## 🎯 Problem Statement

Given an array of integers `nums` and a positive integer `k`, we need to find the **maximum sum** of any contiguous subarray of size `k`.

### 🤔 What does this mean?

Imagine you have a series of numbers, like daily temperatures or stock prices, and you want to find the period of `k` consecutive days with the highest total. You need to examine every possible window of `k` elements and determine which one gives the maximum sum.

### ✨ Examples

**Example 1:**
```
Input: nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
```

<details>
<summary>See explanation</summary>

If we look at all possible subarrays of size 3:
- [2, 1, 5] = 8
- [1, 5, 1] = 7
- [5, 1, 3] = 9 ← Maximum
- [1, 3, 2] = 6

So the maximum sum is 9, which comes from the subarray [5, 1, 3].
</details>

**Example 2:**
```
Input: nums = [5, 6, 1, 2, 6, 6, 4, 3], k = 3
Output: 16
```

<details>
<summary>See explanation</summary>

If we check all possible subarrays of size 3:
- [5, 6, 1] = 12
- [6, 1, 2] = 9
- [1, 2, 6] = 9
- [2, 6, 6] = 14
- [6, 6, 4] = 16 ← Maximum
- [6, 4, 3] = 13

The maximum sum is 16, from the subarray [6, 6, 4].
</details>

## 🧐 The Challenge

Think about how you might solve this problem:

1. A straightforward approach would be to check every possible subarray of size `k` and find the one with the maximum sum.
2. However, this involves a lot of repeated calculations, as consecutive subarrays share most of their elements.

> [!TIP]
> Before moving on, try to think about how you might optimize this problem. Can you avoid recalculating the entire sum for each window?

## 💡 Real-World Applications

This problem has many practical applications:

- Finding the most profitable consecutive days in stock market data
- Identifying periods with the highest temperature or rainfall
- Detecting time windows with peak network traffic
- Finding intervals with maximum sensor readings in IoT applications

## 🤔 Think About It

How would you approach this problem? What's your first instinct for solving it?

In the next lesson, we'll explore why a naive approach might not be the most efficient and introduce the concept of the sliding window technique. 