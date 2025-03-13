---
title: Understanding the Problem - What is Bubble Sort?
---

# Bubble Sort: The Simplest Sorting Algorithm 🫧

> [!NOTE]
> Bubble Sort is often the first sorting algorithm that many programmers learn because of its straightforward concept and implementation.

## 🔍 What are we trying to solve?

Imagine you have a collection of unsorted numbers, like books of different heights stacked randomly on a shelf. How do you organize them in ascending order (from smallest to largest)?

Bubble Sort offers a simple solution that works like this:

1. Compare adjacent elements
2. Swap them if they're in the wrong order
3. Repeat until the entire list is sorted

## 🎯 Our Challenge

**Given an array of integers, sort them in ascending order using the Bubble Sort algorithm.**

### Examples:

```js
Input: [5, 1, 8, 4, 2]
Output: [1, 2, 4, 5, 8]
```

```js
Input: [29, 10, 14, 37, 14]
Output: [10, 14, 14, 29, 37]
```

## 💡 Real-World Analogy

Think of Bubble Sort like arranging a row of people by height. You start at one end of the line and compare each pair of people standing next to each other. If the person on the left is taller than the person on the right, they swap positions. You keep doing this, and with each pass through the line, the tallest person "bubbles up" to the right end.

![Bubble sort visualization](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

## 🤔 Questions to Consider

* What happens when we compare two numbers and they're already in the correct order?
* Why is the algorithm called "Bubble Sort"?
* Can you visualize how the largest elements "bubble up" to the end of the array with each pass?

In the next lesson, we'll break down the key components of the Bubble Sort algorithm and begin to understand how it works step by step. 