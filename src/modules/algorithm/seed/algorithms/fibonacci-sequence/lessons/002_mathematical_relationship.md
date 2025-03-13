---
title: The Mathematical Relationship in Fibonacci Sequence
---

# 📐 The Mathematical Pattern Behind Fibonacci

> [!NOTE]
> Understanding the mathematical relationship is key to implementing the Fibonacci algorithm efficiently.

## The Core Formula 🧮

The Fibonacci sequence can be defined mathematically as:

- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2), for n > 1

This recursive definition tells us that each number is the sum of the two previous numbers in the sequence.

## Visualizing the Pattern 👁️

```mermaid
graph LR
    A[F(0) = 0] --> C[F(2) = 1]
    B[F(1) = 1] --> C
    C --> E[F(3) = 2]
    B --> E
    E --> G[F(4) = 3]
    C --> G
    G --> I[F(5) = 5]
    E --> I
    I --> K[F(6) = 8]
    G --> K
```

This diagram shows how each number depends on the two previous numbers. Notice how F(2) depends on both F(0) and F(1), and similarly, F(3) depends on F(1) and F(2).

## The Golden Ratio Connection ✨

The Fibonacci sequence has a fascinating relationship with the Golden Ratio (approximately 1.618033988749895).

> [!TIP]
> As you go further in the Fibonacci sequence, the ratio of consecutive terms (F(n)/F(n-1)) gets closer and closer to the Golden Ratio!

For example:
- 8/5 = 1.6
- 13/8 = 1.625
- 21/13 = 1.615...
- 34/21 = 1.619...

<details>
<summary>Mathematical proof</summary>

If we call the Golden Ratio φ (phi), it can be proven that:

φ = lim(n→∞) F(n)/F(n-1)

This means that as we compute larger and larger Fibonacci numbers, the ratio between consecutive numbers approaches φ.
</details>

## 🧠 Think About...

Take a moment to consider:
1. How would you express the relationship between consecutive Fibonacci numbers in code?
2. Can you think of a way to calculate F(n) without calculating all previous Fibonacci numbers?
3. What would happen if we started the sequence with different numbers (e.g., 2 and 3)?

In the next lesson, we'll explore different approaches to implement the Fibonacci sequence in code! 