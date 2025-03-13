---
title: Optimized Recursive Approaches
---

# 🚀 Optimizing Recursive Fibonacci

> [!NOTE]
> While naive recursion is inefficient for Fibonacci, there are ways to optimize recursive implementations to make them practical.

## The Problem with Naive Recursion Revisited 🔍

Let's recall our original recursive function:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

This function recalculates the same Fibonacci numbers multiple times, leading to exponential time complexity.

## Dynamic Programming to the Rescue! ✨

**Dynamic Programming** is a technique for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations.

## Approach 1: Memoization (Top-Down) 📝

Memoization involves storing previously calculated results in a cache (usually a dictionary or array):

```python
def fibonacci_memoized(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memoized(n-1, memo) + fibonacci_memoized(n-2, memo)
    return memo[n]
```

> [!TIP]
> Memoization maintains the elegant recursive structure while eliminating redundant calculations!

## Visualizing Memoized Recursion 🧠

```mermaid
graph TD
    A[fibonacci_memoized(5)] --> B[fibonacci_memoized(4)]
    A --> C["fibonacci_memoized(3) (cached)"]
    B --> C
    B --> D["fibonacci_memoized(2) (cached)"]
    C --> D
    C --> E["fibonacci_memoized(1) (base case)"]
    D --> E
    D --> F["fibonacci_memoized(0) (base case)"]
```

Notice how each subproblem is computed only once! After calculating `fibonacci_memoized(3)`, its value is cached and reused when needed again.

## Creating a Memoized Sequence Generator 📚

Here's how we can generate the Fibonacci sequence using memoization:

```python
def fibonacci_sequence_memoized(n, memo={}):
    def fib(i, memo):
        if i in memo:
            return memo[i]
        if i <= 1:
            return i
        memo[i] = fib(i-1, memo) + fib(i-2, memo)
        return memo[i]
    
    if n <= 0:
        return []
    
    return [fib(i, memo) for i in range(n)]
```

## Performance Comparison ⚡

<details>
<summary>Time and Space Complexity</summary>

| Approach | Time Complexity | Space Complexity |
|----------|----------------|-----------------|
| Naive Recursion | O(2^n) | O(n) - call stack |
| Memoized Recursion | O(n) | O(n) - call stack + memo |
| Iterative | O(n) | O(n) - for sequence, O(1) for nth number only |

Memoization dramatically improves the time complexity from exponential to linear!
</details>

## 🧠 Think About...

Consider these questions:
1. How does memoization change the call tree compared to naive recursion?
2. Can you trace through the execution of `fibonacci_memoized(5)` with an initially empty memo?
3. What might be the disadvantages of using a default mutable parameter like `memo={}` in Python?

In the next lesson, we'll explore some advanced mathematical methods for computing Fibonacci numbers! 