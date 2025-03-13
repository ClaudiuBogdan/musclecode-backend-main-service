---
title: Iterative Implementation of Binary Search
---

# 🔄 Implementing Binary Search: The Iterative Approach

Now that we understand the core concept, let's implement binary search using an iterative approach. This is the most common and memory-efficient way to implement the algorithm.

## The Code

```javascript
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

## Breaking Down the Implementation

### 1. Initialize the Search Range

```javascript
let left = 0;
let right = nums.length - 1;
```

We start by defining our search space:
- `left` points to the first element (index 0)
- `right` points to the last element (index `nums.length - 1`)

### 2. The Main Loop

```javascript
while (left <= right) {
  // ...
}
```

We continue searching as long as our search space contains at least one element (`left <= right`). When `left` becomes greater than `right`, it means we've exhausted our search space without finding the target.

### 3. Finding the Middle Element

```javascript
const mid = left + Math.floor((right - left) / 2);
```

> [!TIP]
> We use `left + Math.floor((right - left) / 2)` instead of the simpler `Math.floor((left + right) / 2)` to avoid potential integer overflow in languages where this might be an issue.

### 4. Comparing and Adjusting

```javascript
if (nums[mid] === target) {
  return mid;
}

if (nums[mid] < target) {
  left = mid + 1;
} else {
  right = mid - 1;
}
```

This is the heart of the algorithm:
- If we found the target, return its index
- If the middle value is less than the target, the target must be in the right half
- If the middle value is greater than the target, the target must be in the left half

### 5. Not Found Case

```javascript
return -1;
```

If we exit the loop without finding the target, it doesn't exist in the array, so we return -1.

## Tracing Through an Example

Let's trace through our code with the example from before: searching for `4` in `[-1, 0, 2, 4, 6, 8]`.

| Iteration | left | right | mid | nums[mid] | Comparison | Action |
|-----------|------|-------|-----|-----------|------------|--------|
| Initial   | 0    | 5     | -   | -         | -          | -      |
| 1         | 0    | 5     | 2   | 2         | 4 > 2      | left = mid + 1 = 3 |
| 2         | 3    | 5     | 4   | 6         | 4 < 6      | right = mid - 1 = 3 |
| 3         | 3    | 3     | 3   | 4         | 4 = 4      | Return mid = 3 |

## Time and Space Complexity

- **Time Complexity**: O(log n)
  - Each iteration eliminates half of the remaining elements
  - For an array of size n, we need at most log₂(n) iterations

- **Space Complexity**: O(1)
  - We only use a constant amount of extra space (the variables `left`, `right`, and `mid`)
  - This is one advantage of the iterative approach over the recursive approach

## Common Pitfalls to Avoid

> [!WARNING]
> 1. **Off-by-one errors**: Make sure your loop condition is `left <= right` (not `<`), so you don't miss the case where the target is the only element left.
> 2. **Infinite loops**: Ensure you're properly updating `left` and `right` to narrow the search space.
> 3. **Integer overflow**: Use `left + Math.floor((right - left) / 2)` instead of `Math.floor((left + right) / 2)` for calculating the middle.

## Try It Yourself

<details>
<summary>What would happen if we changed the loop condition from `left <= right` to `left < right`?</summary>

If we used `left < right`, the algorithm would stop when there's only one element left (when `left` equals `right`). This would cause the algorithm to miss the target if it happens to be the last element in our search space.
</details>

In the next lesson, we'll explore an alternative implementation using recursion and compare it with the iterative approach. 