---
title: Practice Problems and Conclusion
---

# 🏆 Mastering Binary Search: Practice and Conclusion

Congratulations on making it to the final lesson! Now it's time to put your knowledge into practice and solidify your understanding of binary search.

## Practice Problems

### Problem 1: Basic Binary Search

Implement binary search to find a target in a sorted array. Return the index if found, -1 otherwise.

<details>
<summary>Solution</summary>

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

// Test cases
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // Output: 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2)); // Output: -1
```
</details>

### Problem 2: Search Insert Position

Given a sorted array and a target value, return the index where the target should be inserted to maintain the sorted order. Assume no duplicates.

<details>
<summary>Solution</summary>

```javascript
function searchInsert(nums, target) {
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
  
  return left;
}

// Test cases
console.log(searchInsert([1, 3, 5, 6], 5)); // Output: 2
console.log(searchInsert([1, 3, 5, 6], 2)); // Output: 1
console.log(searchInsert([1, 3, 5, 6], 7)); // Output: 4
```
</details>

### Problem 3: First and Last Position

Given a sorted array of integers that may contain duplicates, find the first and last position of a given target. Return [-1, -1] if the target is not found.

<details>
<summary>Solution</summary>

```javascript
function searchRange(nums, target) {
  const findFirst = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      
      if (nums[mid] >= target) {
        if (nums[mid] === target) {
          result = mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    
    return result;
  };
  
  const findLast = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      
      if (nums[mid] <= target) {
        if (nums[mid] === target) {
          result = mid;
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  };
  
  return [findFirst(), findLast()];
}

// Test cases
console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // Output: [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // Output: [-1, -1]
```
</details>

### Problem 4: Search in Rotated Sorted Array

Given a rotated sorted array (rotated at some pivot unknown to you beforehand), search for a target. The array may contain duplicates.

<details>
<summary>Solution</summary>

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Handle duplicates
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
      continue;
    }
    
    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is in left half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Right half is sorted
    else {
      // Check if target is in right half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

// Test cases
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1
```
</details>

### Problem 5: Find Peak Element

A peak element is an element that is strictly greater than its neighbors. Given an array, find any peak element. You may assume that `nums[-1] = nums[n] = -∞`.

<details>
<summary>Solution</summary>

```javascript
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] > nums[mid + 1]) {
      // Peak is in the left half (including mid)
      right = mid;
    } else {
      // Peak is in the right half
      left = mid + 1;
    }
  }
  
  return left;
}

// Test cases
console.log(findPeakElement([1, 2, 3, 1])); // Output: 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Output: 5 or 1
```
</details>

## Key Takeaways

Throughout this series of lessons, we've covered:

1. **The Core Concept**: Binary search divides the search space in half at each step, achieving O(log n) time complexity.

2. **Implementation Approaches**:
   - Iterative: More memory-efficient with O(1) space complexity
   - Recursive: More elegant but uses O(log n) space due to the call stack

3. **Variations**:
   - Finding first/last occurrences
   - Search insert position
   - Searching in rotated arrays
   - And more!

4. **Common Pitfalls**:
   - Off-by-one errors
   - Integer overflow
   - Infinite loops
   - Not checking array bounds
   - Assuming the array is sorted

5. **Optimizations**:
   - Early termination
   - Interpolation search
   - Hybrid approaches
   - Memory access optimization

## Real-World Applications Revisited

Binary search is everywhere in computer science and software engineering:

- 🗄️ **Databases**: Efficient record lookup
- 🌐 **Networking**: IP routing tables
- 🎮 **Game Development**: Collision detection
- 📱 **Mobile Apps**: Contact list searching
- 🧠 **Machine Learning**: Hyperparameter tuning

## Final Thoughts

Binary search is a perfect example of how a simple algorithm can provide tremendous efficiency gains. By repeatedly dividing the search space in half, we achieve logarithmic time complexity, making it possible to search through millions of items with just a few comparisons.

Remember these key principles:
- The input must be sorted
- Each step eliminates half of the remaining elements
- The algorithm terminates when the target is found or the search space is empty

> [!TIP]
> Binary search isn't just an algorithm—it's a way of thinking. The divide-and-conquer approach can be applied to many problems beyond searching in arrays.

## What's Next?

Now that you've mastered binary search, consider exploring these related topics:

- Binary Search Trees (BST)
- Balanced search trees (AVL, Red-Black)
- Ternary search (dividing into three parts instead of two)
- Exponential search (useful for unbounded arrays)

## Challenge Yourself

Try implementing binary search in different programming languages or applying it to solve more complex problems. The more you practice, the more intuitive this powerful algorithm will become!

Happy coding! 🚀 