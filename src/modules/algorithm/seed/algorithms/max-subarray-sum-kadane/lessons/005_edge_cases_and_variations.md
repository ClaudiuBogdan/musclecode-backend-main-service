---
title: Edge Cases and Variations of Kadane's Algorithm
---

# 🧩 Edge Cases and Variations of Kadane's Algorithm 🧩

Kadane's Algorithm is elegant and efficient, but like any algorithm, it has edge cases and can be adapted to solve variations of the maximum subarray problem.

## ⚠️ Edge Cases to Consider

### 1. Empty Array

If the array is empty, we should decide what to return. In our implementation, we return `undefined`:

```javascript
if (!nums || nums.length === 0) {
  return undefined;
}
```

Alternatively, some implementations return 0 (assuming an empty subarray with sum 0) or throw an error.

### 2. All Negative Numbers

When all numbers in the array are negative, the maximum subarray will consist of a single element - the largest (least negative) number.

Example:
```
Input: [-2, -3, -1, -5]
Output: -1
```

Our implementation handles this correctly because when comparing `maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i])`, for negative numbers, `nums[i]` will often be larger than `maxEndingHere + nums[i]`, causing us to "restart" the subarray at each step.

### 3. All Positive Numbers

If all numbers are positive, the maximum subarray will be the entire array.

Example:
```
Input: [1, 2, 3, 4]
Output: 10
```

In this case, `maxEndingHere` will always increase, and we'll include all elements.

### 4. Single Element Array

For arrays with just one element, that element is both the maximum subarray and its sum:

```
Input: [5]
Output: 5
```

Our initialization ensures this works correctly:

```javascript
let maxEndingHere = nums[0];
let maxSoFar = nums[0];
```

## 🔄 Variations of the Maximum Subarray Problem

### 1. Maximum Subarray Product

Instead of finding the maximum sum, find the contiguous subarray with the largest product.

```javascript
function maxSubarrayProduct(nums) {
  if (!nums || nums.length === 0) return undefined;
  
  let maxEndingHere = nums[0];
  let minEndingHere = nums[0]; // Track minimum too (important for negatives)
  let maxSoFar = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    // Save previous values before updating
    const prevMax = maxEndingHere;
    const prevMin = minEndingHere;
    
    // Update max and min ending here
    // We need to consider prev min * current due to negative numbers
    maxEndingHere = Math.max(
      nums[i],
      prevMax * nums[i],
      prevMin * nums[i]
    );
    
    minEndingHere = Math.min(
      nums[i],
      prevMax * nums[i],
      prevMin * nums[i]
    );
    
    // Update global max
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}
```

> [!NOTE]
> This variation is more complex because we need to track both maximum and minimum products - a negative number can turn a minimum into a maximum if multiplied by another negative!

### 2. Circular Maximum Subarray Sum

Find the maximum subarray sum in a circular array (where the subarray can wrap around).

```javascript
function maxCircularSubarraySum(nums) {
  if (!nums || nums.length === 0) return undefined;
  
  // Case 1: Maximum subarray does not wrap around
  const maxNormalSum = kadaneMaxSum(nums);
  
  // Case 2: Maximum subarray wraps around
  // This is equivalent to total sum minus the minimum subarray sum
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
    // Invert signs for finding minimum subarray
    nums[i] = -nums[i];
  }
  
  // Find minimum subarray sum (which is maximum of inverted array)
  const minSubarraySum = -kadaneMaxSum(nums);
  
  // If all numbers are negative, return the max normal sum
  if (totalSum + minSubarraySum === 0) {
    return maxNormalSum;
  }
  
  // Return the maximum of the two cases
  return Math.max(maxNormalSum, totalSum + minSubarraySum);
}

// Helper function - standard Kadane's algorithm
function kadaneMaxSum(nums) {
  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}
```

### 3. Maximum Sum Subarray of Size K

Find the maximum sum of a subarray with exactly K elements.

```javascript
function maxSubarraySumOfSizeK(nums, k) {
  if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
    return undefined;
  }
  
  // Calculate sum of first k elements
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  
  let maxSum = currentSum;
  
  // Use sliding window technique
  for (let i = k; i < nums.length; i++) {
    // Add current element and remove element k positions back
    currentSum = currentSum + nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
```

### 4. Maximum Sum Rectangle in 2D Matrix

Extend Kadane's Algorithm to find the maximum sum rectangle in a 2D matrix.

```javascript
function maxSumRectangle(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }
  
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxSum = Number.MIN_SAFE_INTEGER;
  
  // Consider all possible starting columns
  for (let left = 0; left < cols; left++) {
    // Initialize temporary array for 1D Kadane
    const temp = new Array(rows).fill(0);
    
    // Consider all possible ending columns
    for (let right = left; right < cols; right++) {
      // For each row, add value to temp array
      for (let i = 0; i < rows; i++) {
        temp[i] += matrix[i][right];
      }
      
      // Apply 1D Kadane on temp array
      const currentSum = kadaneMaxSum(temp);
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  
  return maxSum;
}
```

> [!WARNING]
> This approach has O(n³) time complexity for an n×n matrix, as we consider all O(n²) possible column ranges and run O(n) Kadane's Algorithm on each.

## 🔍 Pattern Recognition

All these variations share a common pattern:

1. **Break down the problem** into a simpler form that Kadane's Algorithm can solve
2. **Track additional variables** when needed (like minimum values or indices)
3. **Adapt the comparison logic** to fit the specific problem requirements

> [!TIP]
> When faced with a new problem, ask yourself: "Can this be reduced to finding an optimal subarray?" If yes, consider adapting Kadane's Algorithm!

## 🤔 Challenge Questions

<details>
<summary>Challenge #1: Maximum Difference</summary>

How would you modify Kadane's Algorithm to find the maximum difference (nums[j] - nums[i]) where j > i?

<details>
<summary>Hint</summary>

Think about tracking the minimum element seen so far as you iterate through the array.
</details>
</details>

<details>
<summary>Challenge #2: Longest Alternating Subarray</summary>

How would you adapt Kadane's idea to find the longest subarray where elements alternate between positive and negative?

<details>
<summary>Hint</summary>

Consider tracking the length of the alternating subarray ending at each position, similar to how we track the maximum sum.
</details>
</details>

In the next lesson, we'll wrap up with a practical application and implementation tips! 