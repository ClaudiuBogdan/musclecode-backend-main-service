---
title: Edge Cases and Common Pitfalls
---

# ⚠️ Edge Cases and Common Pitfalls

> [!NOTE]
> This lesson covers important edge cases and common mistakes to avoid when implementing the sliding window algorithm.

## 🔍 Important Edge Cases

When implementing the sliding window algorithm, we need to handle several edge cases properly:

### 1. Empty Array

```javascript
// Input: nums = [], k = 3
// Expected output: undefined (or appropriate error value)
```

> [!WARNING]
> Always check if the array is empty before processing! An empty array can't have any valid subarrays.

### 2. Window Size Larger Than Array Length

```javascript
// Input: nums = [1, 2, 3], k = 4
// Expected output: undefined (or appropriate error value)
```

> [!TIP]
> Our implementation should validate that k is not larger than the array length.

### 3. Non-Positive Window Size

```javascript
// Input: nums = [1, 2, 3, 4, 5], k = 0
// Expected output: undefined (or appropriate error value)
```

Window size should be a positive integer. A window of size 0 or negative doesn't make sense in this context.

### 4. Window Size Equal to Array Length

```javascript
// Input: nums = [1, 2, 3], k = 3
// Expected output: 6 (sum of all elements)
```

When k equals the array length, there's only one possible window (the entire array), so the answer is the sum of all elements.

## 🚨 Common Pitfalls

Here are some common mistakes and how to avoid them:

### 1. Incorrect Window Initialization

<details>
<summary>Common mistake</summary>

```javascript
// Incorrect initialization
let maxSum = 0; // What if all numbers are negative?
```

If the array contains all negative numbers, initializing maxSum to 0 would be incorrect because no subarray sum could exceed 0.

**Solution**: Either initialize `maxSum` to `-Infinity` or set it to the first window's sum after calculating it.
</details>

### 2. Off-by-One Errors in Window Sliding

<details>
<summary>Common mistake</summary>

```javascript
// Incorrect sliding logic
windowSum = windowSum - nums[i - k + 1] + nums[i]; // Off-by-one error
```

This would remove the wrong element from the window and lead to incorrect results.

**Solution**: Carefully track the indices of elements entering and leaving the window. Use the formula `windowSum = windowSum - nums[i - k] + nums[i]`.
</details>

### 3. Forgetting to Update Maximum Sum

<details>
<summary>Common mistake</summary>

```javascript
// Missing maxSum update
windowSum = windowSum - nums[i - k] + nums[i];
// Forgot: maxSum = Math.max(maxSum, windowSum);
```

If you forget to update the maximum sum after each window slide, you'll get incorrect results.

**Solution**: Always update maxSum after calculating each new window sum.
</details>

### 4. Handling Boundary Conditions

<details>
<summary>Common mistake</summary>

```javascript
// Incorrect loop condition
for (let i = 0; i <= nums.length - k; i++) // Using <= instead of <
```

This could lead to out-of-bounds array access if not careful.

**Solution**: Double-check your loop conditions to ensure they match your algorithm's logic.
</details>

## 📝 Code with Proper Edge Case Handling

Here's a more robust implementation that handles these edge cases:

```javascript
function maxSubarraySum(nums, k) {
  // Edge cases
  if (!nums || nums.length === 0 || nums.length < k || k <= 0) {
    return undefined;
  }

  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  
  // Initialize maxSum with first window's sum
  let maxSum = windowSum;
  
  // Slide window and track maximum
  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

## 🔄 Testing for Edge Cases

To ensure your implementation is robust, test it with these edge cases:

```javascript
// Test cases for edge conditions
console.log(maxSubarraySum([], 3)); // undefined
console.log(maxSubarraySum([1, 2], 3)); // undefined
console.log(maxSubarraySum([1, 2, 3], 0)); // undefined
console.log(maxSubarraySum([1, 2, 3], -1)); // undefined
console.log(maxSubarraySum([1, 2, 3], 3)); // 6
console.log(maxSubarraySum([-1, -2, -3, -4], 2)); // -3
```

> [!TIP]
> Comprehensive testing with edge cases can save you from subtle bugs that might only appear in production!

## 🧠 Think About It

What other potential edge cases might you encounter when applying the sliding window technique to different problems? How would you adapt your implementation to handle them?

In the next lesson, we'll explore variations of the sliding window algorithm and related problems you can solve using this technique. 