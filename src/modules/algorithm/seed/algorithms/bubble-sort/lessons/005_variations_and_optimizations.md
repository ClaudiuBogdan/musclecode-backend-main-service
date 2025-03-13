---
title: Variations and Optimizations of Bubble Sort
---

# Taking Bubble Sort to the Next Level 🚀

While the basic Bubble Sort algorithm is straightforward, several variations and optimizations can enhance its performance or adapt it for specific use cases.

## 🔄 Variation 1: Bidirectional Bubble Sort (Cocktail Shaker Sort)

The standard Bubble Sort only "bubbles" values in one direction. Cocktail Shaker Sort (also known as Bidirectional Bubble Sort) bubbles values in both directions, potentially reducing the number of iterations needed.

```js
function cocktailShakerSort(nums) {
  let swapped = true;
  let start = 0;
  let end = nums.length - 1;
  
  while (swapped) {
    // Reset swapped flag for the forward pass
    swapped = false;
    
    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        swapped = true;
      }
    }
    
    // If nothing was swapped, the array is sorted
    if (!swapped) break;
    
    // Move the end point back as the largest element is now at the end
    end--;
    
    // Reset swapped flag for the backward pass
    swapped = false;
    
    // Backward pass (right to left)
    for (let i = end; i > start; i--) {
      if (nums[i] < nums[i - 1]) {
        [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        swapped = true;
      }
    }
    
    // Move the start point forward as the smallest element is now at the start
    start++;
  }
  
  return nums;
}
```

> [!NOTE]
> This variation can be more efficient for arrays where small values are at the end and large values are at the beginning, as it "bubbles" small values to the front and large values to the back simultaneously.

## 🔍 Variation 2: Combsort

Combsort improves on Bubble Sort by comparing elements that are far apart rather than just adjacent elements, helping to eliminate small values near the end of the array (known as "turtles" because they move to their proper position very slowly in regular Bubble Sort).

```js
function combSort(nums) {
  const n = nums.length;
  let gap = n;
  let shrink = 1.3;
  let sorted = false;
  
  while (!sorted) {
    // Update gap and ensure it's at least 1
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true; // Will be set to false if any swaps occur
    }
    
    // Compare and swap elements with the current gap
    for (let i = 0; i + gap < n; i++) {
      if (nums[i] > nums[i + gap]) {
        [nums[i], nums[i + gap]] = [nums[i + gap], nums[i]];
        sorted = false; // If a swap occurred, we're not sorted yet
      }
    }
  }
  
  return nums;
}
```

<details>
<summary>Why Combsort works better than Bubble Sort</summary>

The key insight of Combsort is addressing the "turtle" problem. In Bubble Sort, small values at the end of the array take many passes to reach their correct position at the beginning, as they can only move one position per pass.

By using a larger gap that gradually decreases, Combsort allows these small values to move more quickly toward their correct positions. This often leads to significantly fewer comparisons than standard Bubble Sort.
</details>

## 🧠 Optimization 1: Restricting the Inner Loop

We can further optimize our original Bubble Sort by restricting the inner loop based on the last swap position:

```js
function optimizedBubbleSort(nums) {
  const n = nums.length;
  let lastSwappedIndex = n - 1;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    let currentLastSwap = 0;
    
    // Only iterate up to the last position where a swap occurred
    for (let j = 0; j < lastSwappedIndex; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
        currentLastSwap = j;
      }
    }
    
    // Update the last swapped position
    lastSwappedIndex = currentLastSwap;
    
    // If no swaps occurred, the array is sorted
    if (!swapped) break;
  }
  
  return nums;
}
```

> [!TIP]
> This optimization can reduce the number of comparisons significantly, especially for partially sorted arrays or arrays where only a few elements are out of place.

## 🚀 Optimization 2: Recursive Implementation

While recursion isn't typically more efficient for Bubble Sort, it can provide a different perspective on the algorithm:

```js
function recursiveBubbleSort(nums, n = nums.length) {
  // Base case: If we're down to 1 element or empty array, it's sorted
  if (n <= 1) return nums;
  
  let swapped = false;
  
  // One pass of bubble sort, the largest element bubbles to the end
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
      swapped = true;
    }
  }
  
  // If no swapping occurred, the array is sorted
  if (!swapped) return nums;
  
  // Recur with a smaller array size (excluding the last element, which is now in place)
  return recursiveBubbleSort(nums, n - 1);
}
```

## 🤔 Questions to Explore

* Which variation would perform best for a nearly-sorted array?
* How would you implement Bubble Sort for a custom data structure with its own comparison logic?
* Can you think of scenarios where the optimized versions might perform worse than the original?

> [!WARNING]
> Despite these optimizations, remember that Bubble Sort and its variations still have O(n²) worst-case time complexity. For large datasets, more efficient algorithms like Quick Sort, Merge Sort, or Heap Sort are usually preferred.

In the next lesson, we'll explore how to implement Bubble Sort in different programming languages and examine language-specific optimizations. 