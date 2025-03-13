---
title: Under the Hood - Implementation Details
---

# 💻 Implementing Insertion Sort

Now that we have a solid understanding of how Insertion Sort works, let's dive into its implementation. We'll examine the algorithm in pseudocode first, then look at a JavaScript implementation.

## 📝 Pseudocode

Here's the pseudocode for the Insertion Sort algorithm:

```
INSERTION-SORT(A)
1. for i = 1 to A.length - 1
2.     key = A[i]
3.     // Insert A[i] into the sorted subarray A[0...i-1]
4.     j = i - 1
5.     while j >= 0 and A[j] > key
6.         A[j+1] = A[j]
7.         j = j - 1
8.     A[j+1] = key
```

## 🔍 Breaking Down the Algorithm

Let's analyze this pseudocode step by step:

1. We start from the second element (index 1) since we consider the first element as already sorted.
2. For each element at position `i`, we:
   - Store the current element in a temporary variable `key`
   - Look at the elements to the left (the sorted subarray)
   - Shift elements that are greater than `key` one position to the right
   - Insert `key` into the correct position

## ⚙️ JavaScript Implementation

Here's the implementation of Insertion Sort in JavaScript:

```javascript
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    
    // Place key at its correct position
    nums[j + 1] = key;
  }
  
  return nums;
}
```

## 🧩 Code Walkthrough

Let's analyze the JavaScript implementation line by line:

1. **The outer loop** (`for (let i = 1; i < nums.length; i++)`) iterates through each element in the array, starting from the second element (index 1).

2. **Store the current element** (`const key = nums[i]`) in a temporary variable so we don't lose it during the shifting process.

3. **Initialize `j`** (`let j = i - 1`) to point to the element just before the current one.

4. **The inner loop** (`while (j >= 0 && nums[j] > key)`) continues as long as:
   - We haven't reached the beginning of the array (`j >= 0`)
   - The current element we're examining is greater than our key (`nums[j] > key`)

5. **Shifting** (`nums[j + 1] = nums[j]`) moves the element one position to the right to make space for our key.

6. **Move backwards** (`j--`) to check the next element to the left.

7. **Insert the key** (`nums[j + 1] = key`) at its correct position once we've found where it belongs.

## 🔄 Tracing the Execution

Let's trace the execution of the algorithm with a small example: `[5, 2, 4, 6, 1, 3]`

<details>
<summary>Click to see the step-by-step execution</summary>

**Initial array:** `[5, 2, 4, 6, 1, 3]`

**Iteration 1 (i=1):**
- key = 2
- Compare 2 with 5 → shift 5 right
- Insert 2 at position 0
- Array: `[2, 5, 4, 6, 1, 3]`

**Iteration 2 (i=2):**
- key = 4
- Compare 4 with 5 → 4 < 5, so shift 5 right
- Compare 4 with 2 → 4 > 2, so stop
- Insert 4 at position 1
- Array: `[2, 4, 5, 6, 1, 3]`

**Iteration 3 (i=3):**
- key = 6
- Compare 6 with 5 → 6 > 5, so no shifting needed
- Insert 6 at position 3 (stays in place)
- Array: `[2, 4, 5, 6, 1, 3]`

**Iteration 4 (i=4):**
- key = 1
- Compare 1 with 6 → shift 6 right
- Compare 1 with 5 → shift 5 right
- Compare 1 with 4 → shift 4 right
- Compare 1 with 2 → shift 2 right
- Insert 1 at position 0
- Array: `[1, 2, 4, 5, 6, 3]`

**Iteration 5 (i=5):**
- key = 3
- Compare 3 with 6 → shift 6 right
- Compare 3 with 5 → shift 5 right
- Compare 3 with 4 → shift 4 right
- Compare 3 with 2 → 3 > 2, so stop
- Insert 3 at position 2
- Array: `[1, 2, 3, 4, 5, 6]`

**Final sorted array:** `[1, 2, 3, 4, 5, 6]`
</details>

## 🧪 Alternative Implementation: Recursive Approach

Insertion Sort can also be implemented recursively. Here's how:

```javascript
function recursiveInsertionSort(nums, n = nums.length) {
  // Base case: If we've processed all elements, return
  if (n <= 1) return nums;
  
  // Sort the first n-1 elements
  recursiveInsertionSort(nums, n - 1);
  
  // Insert the nth element into the sorted array nums[0..n-1]
  const key = nums[n - 1];
  let j = n - 2;
  
  while (j >= 0 && nums[j] > key) {
    nums[j + 1] = nums[j];
    j--;
  }
  
  nums[j + 1] = key;
  
  return nums;
}
```

> [!NOTE]
> The recursive approach mirrors how we think about the problem: "To sort n elements, first sort n-1 elements, then insert the nth element into the correct position."

## 🤔 Think About It

<details>
<summary>Why is shifting elements more efficient than swapping in Insertion Sort?</summary>

Shifting is more efficient than swapping because:

1. With shifting, we only need to write the element we're inserting once, after finding its correct position.
2. Swapping would require three assignments per comparison (using a temporary variable).
3. Shifting leads to fewer memory writes overall.

This makes the code both cleaner and more efficient!
</details>

<details>
<summary>How would you modify the implementation to sort in descending order?</summary>

To sort in descending order, simply change the comparison operator in the while loop condition from `nums[j] > key` to `nums[j] < key`. This will place larger elements before smaller ones.
</details>

In the next lesson, we'll analyze the time and space complexity of Insertion Sort! 