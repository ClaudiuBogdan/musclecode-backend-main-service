---
title: The Core Concept of Linear Search
---

# 🧠 Understanding Linear Search: A Step-by-Step Approach

Linear search is based on a simple yet powerful concept: **check each element one by one until you find what you're looking for**.

## 🚶‍♂️ The Walk-Through Approach

Think about how you find a contact in a non-alphabetized list of phone numbers:

1. Start at the beginning of the list
2. Check if the current name matches what you're looking for
3. If it matches, you're done! If not, move to the next name
4. If you reach the end without finding a match, the name isn't in your list

## 🧩 The Core Algorithm

```mermaid
graph TD
    A[Start] --> B[Initialize index = 0]
    B --> C{Is index < array length?}
    C -->|Yes| D{Is array[index] == target?}
    D -->|Yes| E[Return index]
    D -->|No| F[Increment index]
    F --> C
    C -->|No| G[Return -1]
    E --> H[End]
    G --> H
```

In plain language:
1. Start from the first element (index 0)
2. Compare the current element with the target
3. If they match, return the current index
4. If they don't match, move to the next element
5. Repeat steps 2-4 until you find the element or reach the end of the array
6. If you reach the end without finding a match, return -1

## 💡 Key Insight

> [!TIP]
> The beauty of linear search is its simplicity. There's no special setup or requirements for the data. It works on arrays of any size and doesn't require them to be sorted.

<details>
<summary>⚡ Understanding the Efficiency</summary>

- **Best case**: O(1) - The target is the first element we check
- **Worst case**: O(n) - The target is the last element or not present at all
- **Average case**: O(n/2) - On average, we'll need to check half the elements

While this may not be the most efficient algorithm for large datasets, its simplicity makes it an excellent choice for small arrays or situations where the array is unsorted.

</details>

## 🔄 The Iterative Process

Let's trace through a simple example:

Array: `[5, 2, 4, 6, 1, 3]`  
Target: `6`

1. Check index 0: `5 != 6` ❌
2. Check index 1: `2 != 6` ❌
3. Check index 2: `4 != 6` ❌
4. Check index 3: `6 == 6` ✅
5. Return index 3

This step-by-step process is the essence of the linear search algorithm.

In the next lesson, we'll look at different ways to implement this algorithm and examine some code examples. 