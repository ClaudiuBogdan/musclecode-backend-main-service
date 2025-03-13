---
title: Step-by-Step Example - Seeing Insertion Sort in Action
---

# 📊 Step-by-Step Example

Let's walk through a detailed example to really understand how Insertion Sort works. We'll trace the execution of the algorithm on the array `[6, 2, 10, 7]`.

## 🎯 Starting Point

Our initial array: `[6, 2, 10, 7]`

We'll walk through each iteration, showing:
- The current state of the array
- The element we're currently inserting
- The comparison and shifting operations
- The array after the insertion

## 🔄 Iteration 1

1. **Initial State**:
   ```
   [ | 6, 2, 10, 7 ]   (No elements in the sorted region yet)
   ```

2. **Consider the first element (6) as sorted**:
   ```
   [ 6 | 2, 10, 7 ]   (Sorted region: [6], Unsorted region: [2, 10, 7])
   ```

## 🔄 Iteration 2

1. **Current Element**: `2` (first element from the unsorted region)
   ```
   [ 6 | 2, 10, 7 ]   (We're considering 2 for insertion)
   ```

2. **Compare with sorted elements**:
   ```
   Compare 2 with 6: 2 < 6, so shift 6 to the right
   [ _, 6 | 10, 7 ]   (Created a gap for 2)
   ```

3. **Insert 2 into the gap**:
   ```
   [ 2, 6 | 10, 7 ]   (Sorted region: [2, 6], Unsorted region: [10, 7])
   ```

## 🔄 Iteration 3

1. **Current Element**: `10` (next element from the unsorted region)
   ```
   [ 2, 6 | 10, 7 ]   (We're considering 10 for insertion)
   ```

2. **Compare with sorted elements**:
   ```
   Compare 10 with 6: 10 > 6, so 10 stays in place
   [ 2, 6, 10 | 7 ]   (Sorted region: [2, 6, 10], Unsorted region: [7])
   ```

## 🔄 Iteration 4

1. **Current Element**: `7` (last element from the unsorted region)
   ```
   [ 2, 6, 10 | 7 ]   (We're considering 7 for insertion)
   ```

2. **Compare with sorted elements**:
   ```
   Compare 7 with 10: 7 < 10, so shift 10 to the right
   [ 2, 6, _, 10 ]   (Created a gap for 7)
   ```

3. **Continue comparing**:
   ```
   Compare 7 with 6: 7 > 6, so 7 stays in the gap after 6
   [ 2, 6, 7, 10 ]   (Inserted 7 into the correct position)
   ```

4. **Final Result**:
   ```
   [ 2, 6, 7, 10 | ]   (Sorted region: [2, 6, 7, 10], Unsorted region: [])
   ```

## 🎉 The Result

We've successfully sorted the array: `[2, 6, 7, 10]`

## 📸 Visual Trace

Here's a visual representation of all the steps:

```
Initial:  [6, 2, 10, 7]
Step 1:   [6 | 2, 10, 7]     (Consider first element as sorted)
Step 2:   [2, 6 | 10, 7]     (Insert 2 into sorted portion)
Step 3:   [2, 6, 10 | 7]     (Insert 10 into sorted portion)
Step 4:   [2, 6, 7, 10 |]    (Insert 7 into sorted portion)
```

## 🔍 Key Observations

- Each element is inserted into its proper position in the sorted portion
- We needed a total of 3 comparisons and 2 shifts to sort this array
- Elements may need to shift multiple positions to make room for the current element

> [!TIP]
> Notice how the array gradually becomes sorted from left to right. This left-to-right sorting pattern is a characteristic feature of Insertion Sort.

## 🤔 Think About It

<details>
<summary>What would happen if the array was in reverse order (e.g., [10, 7, 6, 2])? How many comparisons and shifts would be needed?</summary>

If the array was in reverse order [10, 7, 6, 2]:
- For 7: 1 comparison, 1 shift
- For 6: 2 comparisons, 2 shifts
- For 2: 3 comparisons, 3 shifts

That's a total of 6 comparisons and 6 shifts - the maximum possible for an array of this size. This is the worst-case scenario for Insertion Sort, resulting in O(n²) time complexity.
</details>

<details>
<summary>What if we were sorting in descending order instead of ascending?</summary>

To sort in descending order, we would simply change the comparison operator. Instead of inserting elements when they're smaller than the sorted elements, we would insert them when they're larger. The overall algorithm remains the same.
</details>

In the next lesson, we'll break down the pseudocode and JavaScript implementation of Insertion Sort! 