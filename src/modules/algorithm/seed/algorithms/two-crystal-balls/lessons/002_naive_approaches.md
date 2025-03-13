---
title: Naive Approaches to the Two Crystal Balls Problem
---

# 🕹️ Naive Approaches

> [!NOTE]
> Before diving into the optimal solution, let's explore some naive approaches to the Two Crystal Balls problem and understand their limitations.

## 👶 Approach 1: Linear Search

The simplest approach is to start from the first floor and move up one by one until we find the breaking point.

```javascript
function linearSearch(breaks) {
  for (let i = 0; i < breaks.length; i++) {
    if (breaks[i]) {
      return i;
    }
  }
  return -1;  // Balls never break
}
```

### Analysis:
- ✅ **Simple to implement**
- ✅ **Guaranteed to find the correct answer**
- ❌ **Time Complexity: O(n)** - In the worst case, we might need to check all floors
- ❌ **Doesn't utilize the second ball effectively**

> [!WARNING]
> This approach wastes our second ball! We're essentially solving the problem as if we had only one ball.

## 🔍 Approach 2: Binary Search?

If we had unlimited balls, binary search would be an excellent approach:

```javascript
function binarySearch(breaks) {
  let low = 0;
  let high = breaks.length - 1;
  
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    
    if (breaks[mid] && (mid === 0 || !breaks[mid - 1])) {
      return mid;  // Found the first true
    } else if (breaks[mid]) {
      high = mid - 1;  // Search in the lower half
    } else {
      low = mid + 1;   // Search in the upper half
    }
  }
  
  return -1;  // Balls never break
}
```

### Analysis:
- ✅ **Time Complexity: O(log n)** - Much faster than linear search for large n
- ❌ **Doesn't work with our constraint of having only two balls!**

> [!WARNING]
> The problem with binary search is that if our first ball breaks during testing, we've lost it! We can't continue with binary search and would have to resort to linear search for the remaining range.

## 🤔 Why These Approaches Fall Short

Imagine a 100-floor building:

- **Linear Search**: Could require up to 100 drops in the worst case (if the breaking point is at the 100th floor or the balls never break)

- **Binary Search**: If we drop the first ball at floor 50 and it breaks, we've lost it. Now we must use the second ball to check floors 1-49 one by one, potentially requiring 50 drops. In total, that's up to 50 drops in the worst case.

> [!TIP]
> The key insight is that we need a strategy that balances:
> 1. Making big jumps to cover more ground quickly
> 2. Ensuring that if the first ball breaks, we can check the remaining range with the second ball without too many drops

<details>
<summary>Think about these questions...</summary>

1. Is there a middle ground between linear search (too slow) and binary search (too risky with only two balls)?

2. What if we jumped by 10 floors at a time (floor 10, 20, 30, etc.) with the first ball? If it breaks at floor 30, we'd use the second ball to check floors 21-29 one by one. Would this be better? How many drops would it take in the worst case?

3. Is there an optimal jump size that minimizes the worst-case number of drops?
</details>

In the next lesson, we'll explore the mathematical intuition behind the optimal solution and discover why jumping by √n intervals is the perfect strategy! 