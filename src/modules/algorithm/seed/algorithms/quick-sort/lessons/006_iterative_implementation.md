---
title: Iterative Implementation
---

# Quick Sort Without Recursion 🔄

> [!NOTE]
> In this lesson, we'll explore how to implement Quick Sort iteratively using a stack, eliminating the need for recursion.

## Why Go Iterative? 🤔

While recursion is elegant and intuitive for implementing Quick Sort, it has some limitations:

1. **Stack Overflow**: For very large arrays, deep recursion might exceed the call stack limit
2. **Performance**: Function calls have overhead that iterative solutions can avoid
3. **Control**: An iterative approach gives more explicit control over the sorting process

## The Key Insight: Explicit Stack 📚

The secret to converting a recursive algorithm to an iterative one is to:
1. Identify what information is needed for each recursive call
2. Manage that information explicitly with your own stack data structure

For Quick Sort, each recursive call needs:
- The `low` index of the subarray
- The `high` index of the subarray

## Iterative Quick Sort Algorithm 🔍

Here's the step-by-step approach:

1. Create a stack to simulate recursion
2. Push the initial range (`0` to `length-1`) onto the stack
3. While the stack isn't empty:
   - Pop a range from the stack
   - Partition the subarray for that range
   - Push the resulting subarrays onto the stack (if they have more than one element)

## Visualizing the Iterative Process 📊

Let's see how this works with our example: `[7, 2, 1, 6, 8, 5, 3, 4]`

<details>
<summary>Step-by-step Stack Visualization</summary>

Initial array: `[7, 2, 1, 6, 8, 5, 3, 4]`

1. Push initial range: Stack = `[[0, 7]]`
2. Pop `[0, 7]`, partition around `4` → pivot index = 3
   - Array becomes: `[2, 1, 3, 4, 8, 5, 7, 6]`
   - Push right subarray: Stack = `[[4, 7]]`
   - Push left subarray: Stack = `[[4, 7], [0, 2]]`

3. Pop `[0, 2]`, partition around `3` → pivot index = 2
   - Left subarray becomes: `[2, 1, 3]`
   - Push right subarray: Stack = `[[4, 7]]` (empty right, nothing to push)
   - Push left subarray: Stack = `[[4, 7], [0, 1]]`

4. Pop `[0, 1]`, partition around `1` → pivot index = 0
   - Left subarray becomes: `[1, 2, 3]`
   - Push right subarray: Stack = `[[4, 7], [1, 1]]`
   - Push left subarray: Stack = `[[4, 7], [1, 1]]` (empty left, nothing to push)

5. Pop `[1, 1]`, single element, skip partitioning: Stack = `[[4, 7]]`

6. Pop `[4, 7]`, partition around `6` → pivot index = 5
   - Right subarray becomes: `[2, 1, 3, 4, 5, 6, 8, 7]`
   - Push right subarray: Stack = `[[6, 7]]`
   - Push left subarray: Stack = `[[6, 7], [4, 4]]`

7. Pop `[4, 4]`, single element, skip partitioning: Stack = `[[6, 7]]`

8. Pop `[6, 7]`, partition around `7` → pivot index = 6
   - Right subarray becomes: `[2, 1, 3, 4, 5, 6, 7, 8]`
   - Stack is now empty

9. Array is sorted: `[1, 2, 3, 4, 5, 6, 7, 8]`
</details>

## The Iterative Quick Sort Code 💻

Here's the complete iterative implementation in JavaScript:

```javascript
function quickSort(nums) {
  const arr = [...nums]; // Copy array to avoid mutation
  const stack = [];
  
  // Push initial range
  stack.push([0, arr.length - 1]);
  
  // Process ranges until stack is empty
  while (stack.length > 0) {
    // Pop the next range to process
    const [low, high] = stack.pop();
    
    // Only process if there are at least 2 elements
    if (low < high) {
      // Partition and get pivot index
      const pivotIndex = partition(arr, low, high);
      
      // Push the larger subarray first (optimization)
      if (pivotIndex - 1 - low < high - (pivotIndex + 1)) {
        // Right subarray is larger
        stack.push([low, pivotIndex - 1]);
        stack.push([pivotIndex + 1, high]);
      } else {
        // Left subarray is larger
        stack.push([pivotIndex + 1, high]);
        stack.push([low, pivotIndex - 1]);
      }
    }
  }
  
  return arr;
}

// The partition function remains exactly the same
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}
```

> [!TIP]
> The optimization to push the larger subarray first ensures we process smaller subarrays earlier, which can reduce the maximum stack size.

## Comparing Recursive and Iterative Approaches ⚖️

| Aspect | Recursive | Iterative |
|--------|-----------|-----------|
| **Readability** | More intuitive, cleaner code | More complex, explicit stack management |
| **Memory** | Uses call stack (potential overflow) | Uses explicit stack (more controllable) |
| **Performance** | Function call overhead | Potentially faster for very large arrays |
| **Implementation** | Simpler | More complex |

## When to Choose Each Approach 🔍

- **Choose Recursive** when:
  - Code readability is a priority
  - The input size is moderate and stack overflow isn't a concern
  - You want a simpler implementation

- **Choose Iterative** when:
  - Working with very large arrays
  - Stack overflow is a concern
  - Maximum performance is required
  - You need explicit control over the sorting process

> [!WARNING]
> The iterative approach trades simplicity for control. Always profile your code to see which implementation performs better for your specific use case.

In the next lesson, we'll analyze the time and space complexity of Quick Sort and compare it with other sorting algorithms. 