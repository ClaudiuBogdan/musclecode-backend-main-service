---
title: Practice Problems and Conclusion
---

# 🏆 Mastering Binary Search: Practice and Conclusion

## Learning Objectives
By the end of this lesson, you will be able to:
- Solve various problems using binary search
- Recognize when and how to adapt binary search for different scenarios
- Evaluate your understanding of binary search concepts
- Apply binary search confidently in coding interviews and real projects
- Identify related algorithms and concepts to explore next

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

## Binary Search Knowledge Check

Test your understanding with these questions:

<details>
<summary>1. What is the time complexity of binary search?</summary>

**Answer**: O(log n) in the average and worst case, O(1) in the best case (when the target is at the middle).
</details>

<details>
<summary>2. Which of these arrays can be searched using binary search?</summary>
- A. [3, 1, 4, 1, 5, 9, 2, 6]
- B. [1, 2, 3, 4, 5, 6, 7, 8]
- C. ["apple", "banana", "orange", "pear"]
- D. [true, false, true, false]

**Answer**: B and C can be searched using binary search as they are sorted (C is sorted alphabetically). A is not sorted. D technically has a sort order (false before true) but contains duplicates which might affect finding the correct occurrence.
</details>

<details>
<summary>3. What's the maximum number of comparisons needed to find a value in a sorted array of 1,024 elements using binary search?</summary>

**Answer**: log₂(1024) = 10 comparisons
</details>

<details>
<summary>4. Which of the following is NOT a requirement for binary search?</summary>
- A. The collection must be sorted
- B. The collection must allow random access (constant-time access to any element)
- C. The collection must contain unique elements
- D. The collection must have a defined ordering relation

**Answer**: C. Binary search works fine with duplicates, though you may need a modified version to find the first or last occurrence.
</details>

<details>
<summary>5. What happens if we calculate the middle index in binary search as `(left + right) / 2` instead of `left + (right - left) / 2`?</summary>

**Answer**: In languages that use fixed-size integers like Java or C++, `(left + right)` can cause integer overflow if the sum exceeds the maximum value for that integer type. Using `left + (right - left) / 2` avoids this issue because `(right - left)` will always be within the valid range.
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

5. **Optimization Techniques**:
   - Early termination checks
   - Interpolation search for uniform data
   - Hybrid approaches for different array sizes
   - Memory access optimizations

## Beyond Binary Search: Where to Go Next

Now that you've mastered binary search, here are some related topics to explore:

### Advanced Search Algorithms
- **Ternary Search**: Divides the search space into three parts instead of two
- **Exponential Search**: Finds a range where the element is present and then uses binary search
- **Jump Search**: Jumps ahead by fixed steps, then linear searches, balancing between linear and binary search
- **Fibonacci Search**: Similar to binary search but uses Fibonacci numbers to determine search ranges

### Binary Search in Tree Structures
- **Binary Search Trees**: Hierarchical data structures based on binary search principles
- **AVL Trees**: Self-balancing BSTs that maintain O(log n) search time
- **Red-Black Trees**: Another type of self-balancing BST used in many language standard libraries
- **B-trees and B+ trees**: Used extensively in database indexing and file systems

### Related Problem-Solving Patterns
- **Two Pointers Technique**: Often used alongside binary search in array problems
- **Sliding Window**: Efficient way to process subarrays or substrings
- **Divide and Conquer**: The broader algorithmic paradigm that binary search belongs to
- **Decrease and Conquer**: Another related paradigm that reduces problem size incrementally

### Practical Applications
- **Database Systems**: Learn how databases implement indices using B-trees and binary search
- **System Design**: Study how binary search principles apply to distributed systems and load balancing
- **Machine Learning**: Explore how binary search is used in hyperparameter tuning and decision trees

## Final Challenge

Try implementing binary search in a new programming language you haven't used before, or apply it to solve a real-world problem in your current project. Remember to test edge cases and optimize for the specific requirements of your application.

Thank you for completing this comprehensive guide to binary search! We hope you've gained not just an understanding of the algorithm itself, but also an appreciation for its elegance, efficiency, and wide-ranging applications. 