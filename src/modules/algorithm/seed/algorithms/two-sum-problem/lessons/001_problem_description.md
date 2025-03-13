---
title: Understanding the Two Sum Problem
---

# 🧩 The Two Sum Problem: Finding Pairs That Add Up

> [!NOTE]
> This is the first step in our journey to understand and solve the Two Sum Problem, a classic algorithm challenge.

## 🔍 What is the Two Sum Problem?

The Two Sum problem asks us to find two numbers in an array that add up to a specific target value. It's like finding two puzzle pieces that fit perfectly together to make a complete picture!

Imagine you have a jar of numbered coins, and you're looking for two coins that add up to a specific amount. That's essentially what we're doing with this algorithm.

## 📝 The Problem Statement

Given an array of integers `nums` and an integer `target`, we need to return the **indices** of the two numbers that add up to the target. Here are the specific requirements:

- Each input has exactly one solution
- We cannot use the same element twice
- We can return the answer in any order

## 💡 Examples to Illustrate

Let's look at some examples to better understand the problem:

### Example 1:
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```
Why? Because nums[0] + nums[1] = 2 + 7 = 9

### Example 2:
```
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```
Why? Because nums[1] + nums[2] = 2 + 4 = 6

### Example 3:
```
Input: nums = [3, 3], target = 6
Output: [0, 1]
```
Why? Because nums[0] + nums[1] = 3 + 3 = 6

## 🤔 Before We Begin Solving

Before we dive into solutions, take a moment to think:

<details>
<summary>What makes this problem interesting?</summary>

The Two Sum problem is interesting because it teaches us how to efficiently find relationships between elements in an array. It's a perfect example of how the right data structure can dramatically improve algorithm efficiency.
</details>

<details>
<summary>What's your first instinct for solving this?</summary>

Many people first think of checking every possible pair of numbers (a brute force approach). This is a valid starting point, but we'll discover there are more efficient ways to solve this problem!
</details>

> [!TIP]
> As you work through this algorithm, try to think beyond just finding a solution—consider how efficient your solution is and whether there are ways to optimize it.

## 🧠 Think About It

How would you approach finding two numbers that add up to a target value? Would you check every possible pair? Or is there a smarter way?

In the next lesson, we'll explore our first approach to solving this problem! 