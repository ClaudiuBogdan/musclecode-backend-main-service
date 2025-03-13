---
title: The Recursive Approach to Fibonacci
---

# 🔄 Recursive Fibonacci Implementation

> [!NOTE]
> Recursion is a natural fit for the Fibonacci sequence due to its mathematical definition.

## What is Recursion? 🤔

Recursion is a programming technique where a function calls itself to solve a problem. It's particularly elegant for problems that can be broken down into smaller, similar sub-problems.

## The Recursive Approach for Fibonacci 🧩

Since the Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

This naturally translates to a recursive function:

```python
def fibonacci(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n-1) + fibonacci(n-2)
```

## Visualizing Recursive Calls 🌳

For calculating F(5), the recursive calls would look like:

```mermaid
graph TD
    A[fibonacci(5)] --> B[fibonacci(4)]
    A --> C[fibonacci(3)]
    B --> D[fibonacci(3)]
    B --> E[fibonacci(2)]
    C --> F[fibonacci(2)]
    C --> G[fibonacci(1)]
    D --> H[fibonacci(2)]
    D --> I[fibonacci(1)]
    E --> J[fibonacci(1)]
    E --> K[fibonacci(0)]
    F --> L[fibonacci(1)]
    F --> M[fibonacci(0)]
    H --> N[fibonacci(1)]
    H --> O[fibonacci(0)]
```

Notice how some calculations (like `fibonacci(3)` and `fibonacci(2)`) are repeated multiple times! 😱

## Implementing the Recursive Algorithm 💻

Here's how we can create a function to generate the first n Fibonacci numbers using recursion:

```python
def fibonacci_sequence(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
    if n == 2:
        return [0, 1]
    
    sequence = fibonacci_sequence(n - 1)
    sequence.append(sequence[-1] + sequence[-2])
    return sequence
```

> [!WARNING]
> Pure recursion for Fibonacci can be very inefficient for large values of n due to repeated calculations!

## The Challenge of Pure Recursion ⚠️

<details>
<summary>Performance Issues</summary>

The time complexity of the naive recursive Fibonacci is O(2^n), which grows exponentially. This means calculating even moderately large Fibonacci numbers can be extremely slow.

For example, calculating F(50) with pure recursion would take billions of operations and significant time!
</details>

## 🧠 Think About...

Consider these questions:
1. Can you trace the execution of `fibonacci_sequence(4)` step by step?
2. Why is the time complexity of naive recursive Fibonacci so high?
3. How could we improve the efficiency of our recursive approach?

In the next lesson, we'll explore a more efficient approach: the iterative Fibonacci implementation! 