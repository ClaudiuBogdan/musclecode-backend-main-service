---
title: Edge Cases and Common Pitfalls
---

# ⚠️ Edge Cases and Common Pitfalls in the Two Sum Problem

> [!NOTE]
> In this lesson, we'll explore common edge cases and mistakes to avoid when implementing the Two Sum algorithm.

## 🚩 Understanding Edge Cases

Edge cases are special situations that might not be immediately obvious but need special handling in your algorithm. Being aware of these helps you write more robust code.

## 🧐 Common Edge Cases in the Two Sum Problem

### 1. Using the Same Element Twice

The problem statement specifically says you can't use the same element twice. This is why in the brute force approach, we start our inner loop from `i + 1` rather than from `0`.

```javascript
// Correct: Each element is only used once
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) { // Start from i+1
    // ...
  }
}
```

> [!WARNING]
> A common mistake is to check all pairs, including (i, i), which would use the same element twice.

### 2. Duplicate Values in the Array

The array might contain duplicate values, which can be tricky to handle correctly.

```
nums = [3, 3], target = 6
```

In this case, both elements are `3` and we want to use both of them (at indices 0 and 1) to reach our target of `6`.

> [!TIP]
> The hash map approach naturally handles this because we store each element's index as we go. If we encounter a second `3`, its complement (also `3`) is already in the hash map with a different index.

### 3. No Solution Exists

Although the problem statement says we can assume there is exactly one solution, in a real-world application, we should handle the case where no solution exists:

```javascript
function twoSum(nums, target) {
  // ... algorithm implementation ...
  
  // If we reach this point, no solution was found
  return undefined; // or null, or throw an error
}
```

### 4. Empty Array or Too Small Array

If the array has fewer than 2 elements, it's impossible to find two numbers that sum to the target:

```javascript
function twoSum(nums, target) {
  if (nums.length < 2) {
    return undefined; // Not enough elements to form a pair
  }
  
  // ... rest of the algorithm ...
}
```

## 😱 Common Pitfalls to Avoid

### 1. Incorrect Complement Calculation

Make sure you calculate the complement correctly: `complement = target - current_number`

```javascript
// WRONG ❌
const complement = target + nums[i];

// CORRECT ✅
const complement = target - nums[i];
```

### 2. Returning Values Instead of Indices

Remember the Two Sum problem asks for indices, not the values themselves:

```javascript
// WRONG ❌
return [nums[i], nums[j]]; // Returning values

// CORRECT ✅
return [i, j]; // Returning indices
```

### 3. Adding to the Hash Map Too Early

In the hash map approach, it's important to check for the complement before adding the current element to the hash map:

```javascript
// CORRECT ORDER ✅
if (numMap.has(complement)) {
  return [numMap.get(complement), i];
}
numMap.set(nums[i], i);
```

If we reversed these steps, we might erroneously match an element with itself!

## 🔍 Special Case: When the Complement Equals the Current Number

Consider this example:
```
nums = [4, 2, 1], target = 8
```

When we get to `nums[0] = 4`, its complement is also `4` (since `8 - 4 = 4`).

<details>
<summary>How do we handle this case?</summary>

This is actually handled automatically by our algorithm! Since we check for the complement before adding the current number to the hash map, we won't find a match for the first `4`. We'll only find a match if there's a second `4` later in the array.

```javascript
// Processing nums[0] = 4
const complement = 8 - 4; // complement = 4
// Check if 4 is in hash map - it's not yet
// Add 4 to hash map with index 0

// If we later encounter another 4 at index k
const complement = 8 - 4; // complement = 4
// Check if 4 is in hash map - yes, at index 0
// Return [0, k]
```
</details>

## 💡 Testing Your Implementation

It's a good practice to test your implementation with various edge cases. Here are some test cases you might consider:

```javascript
// Standard case
console.assert(JSON.stringify(twoSum([2, 7, 11, 15], 9)) === JSON.stringify([0, 1]));

// Duplicate elements
console.assert(JSON.stringify(twoSum([3, 3], 6)) === JSON.stringify([0, 1]));

// Target equals twice of an element
console.assert(JSON.stringify(twoSum([4, 2, 1], 8)) === JSON.stringify([0, 0]));

// No solution (not required by the problem, but good to handle)
console.assert(twoSum([1, 2, 3], 10) === undefined);
```

> [!TIP]
> Always test your algorithm with multiple examples, including edge cases, to ensure it works correctly in all scenarios.

## 🤔 Thinking Exercise

Can you think of any other edge cases or pitfalls that might come up when implementing the Two Sum problem? How would you handle them?

In the next lesson, we'll explore real-world applications of the Two Sum problem and related algorithms! 