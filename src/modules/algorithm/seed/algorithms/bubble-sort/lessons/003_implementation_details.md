---
title: Implementing Bubble Sort with Code
---

# Coding Bubble Sort from Scratch 💻

Now that we understand the principles of Bubble Sort, let's implement it step by step.

## 🧩 The Components We Need

To implement Bubble Sort, we need:

1. A function that takes an array as input
2. Two nested loops:
   - Outer loop to control the number of passes
   - Inner loop to handle element comparisons and swaps
3. A way to swap elements
4. (Optional) An optimization to exit early when the array is sorted

## 📝 The Basic Implementation

Let's write a simple implementation in JavaScript:

```js
function bubbleSort(nums) {
  const n = nums.length;
  
  // Outer loop for passes
  for (let i = 0; i < n; i++) {
    // Inner loop for comparisons in this pass
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (nums[j] > nums[j + 1]) {
        // Swap elements if they're in the wrong order
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  
  return nums;
}
```

> [!NOTE]
> Notice how our inner loop runs from 0 to `n - i - 1`. This is because after each pass, the largest `i` elements are already in their correct positions at the end.

## 🔄 Let's Trace Through an Example

Let's trace through our algorithm with the array `[5, 3, 8, 4, 2]`:

<details>
<summary>Detailed step-by-step execution</summary>

**Pass 1 (i = 0):**
- Compare nums[0] (5) and nums[1] (3): 5 > 3, so swap → [3, 5, 8, 4, 2]
- Compare nums[1] (5) and nums[2] (8): 5 < 8, no swap → [3, 5, 8, 4, 2]
- Compare nums[2] (8) and nums[3] (4): 8 > 4, so swap → [3, 5, 4, 8, 2]
- Compare nums[3] (8) and nums[4] (2): 8 > 2, so swap → [3, 5, 4, 2, 8]
- End of Pass 1: The largest element (8) is in its correct position

**Pass 2 (i = 1):**
- Compare nums[0] (3) and nums[1] (5): 3 < 5, no swap → [3, 5, 4, 2, 8]
- Compare nums[1] (5) and nums[2] (4): 5 > 4, so swap → [3, 4, 5, 2, 8]
- Compare nums[2] (5) and nums[3] (2): 5 > 2, so swap → [3, 4, 2, 5, 8]
- End of Pass 2: The second largest element (5) is in its correct position

**Pass 3 (i = 2):**
- Compare nums[0] (3) and nums[1] (4): 3 < 4, no swap → [3, 4, 2, 5, 8]
- Compare nums[1] (4) and nums[2] (2): 4 > 2, so swap → [3, 2, 4, 5, 8]
- End of Pass 3: The third largest element (4) is in its correct position

**Pass 4 (i = 3):**
- Compare nums[0] (3) and nums[1] (2): 3 > 2, so swap → [2, 3, 4, 5, 8]
- End of Pass 4: The array is now sorted

Final result: [2, 3, 4, 5, 8]
</details>

## 🚀 Optimized Implementation

We can improve our implementation with an early exit strategy. If no swaps occur during a pass, the array is already sorted:

```js
function bubbleSort(nums) {
  const n = nums.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred in this pass, the array is sorted
    if (!swapped) break;
  }
  
  return nums;
}
```

> [!TIP]
> This optimization makes Bubble Sort perform in O(n) time for already sorted arrays, which is its best-case scenario!

## 🧪 Edge Cases to Consider

When implementing Bubble Sort, consider these edge cases:

1. Empty array (`[]`) → Should return empty array
2. Single element array (`[5]`) → Already sorted, return as is
3. Already sorted array (`[1, 2, 3, 4]`) → Our optimization should detect this quickly

## 🤔 Questions to Explore

* What would happen if we didn't use the optimization and the array was already sorted?
* How would you modify the algorithm to sort in descending order instead?
* Can you identify the time and space complexity of this algorithm?

In the next lesson, we'll analyze the algorithm's performance and understand when to use (or avoid) Bubble Sort. 