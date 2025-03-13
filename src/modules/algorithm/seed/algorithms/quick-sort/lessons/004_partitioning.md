---
title: The Partitioning Process
---

# Partitioning: The Heart of Quick Sort 🔀

> [!NOTE]
> In this lesson, we'll explore the partitioning process - the most crucial operation in Quick Sort that rearranges elements around the pivot.

## What is Partitioning? 🧩

**Partitioning** is the process of:
1. Selecting a pivot element
2. Rearranging the array so that:
   - All elements smaller than the pivot are moved to its left
   - All elements larger than the pivot are moved to its right
3. Placing the pivot in its final sorted position

This single operation does the heavy lifting in Quick Sort!

## The Partitioning Algorithm Step by Step 🔄

Let's walk through the partitioning process with our example array: `[7, 2, 1, 6, 8, 5, 3, 4]`

We'll use the last element (`4`) as our pivot:

<details open>
<summary>Step-by-step visualization</summary>

1. Start with pointers `i = 0` (tracking the boundary of elements < pivot) and `j = 0` (scanning the array)
   ```
   [7, 2, 1, 6, 8, 5, 3, 4]
    i,j                   p
   ```

2. `j = 0`: Is `7 < 4`? No, so don't swap, just increment `j`
   ```
   [7, 2, 1, 6, 8, 5, 3, 4]
    i  j                 p
   ```

3. `j = 1`: Is `2 < 4`? Yes, so swap `arr[i]` and `arr[j]`, increment both `i` and `j`
   ```
   [2, 7, 1, 6, 8, 5, 3, 4]
       i  j              p
   ```

4. `j = 2`: Is `1 < 4`? Yes, so swap `arr[i]` and `arr[j]`, increment both
   ```
   [2, 1, 7, 6, 8, 5, 3, 4]
          i  j           p
   ```

5. `j = 3`: Is `6 < 4`? No, just increment `j`
   ```
   [2, 1, 7, 6, 8, 5, 3, 4]
          i     j        p
   ```

6. `j = 4`: Is `8 < 4`? No, just increment `j`
   ```
   [2, 1, 7, 6, 8, 5, 3, 4]
          i        j     p
   ```

7. `j = 5`: Is `5 < 4`? No, just increment `j`
   ```
   [2, 1, 7, 6, 8, 5, 3, 4]
          i           j  p
   ```

8. `j = 6`: Is `3 < 4`? Yes, so swap `arr[i]` and `arr[j]`, increment both
   ```
   [2, 1, 3, 6, 8, 5, 7, 4]
             i           j,p
   ```

9. `j` is now at the pivot. We're done scanning. Place the pivot at position `i` by swapping `arr[i]` and `arr[high]`
   ```
   [2, 1, 3, 4, 8, 5, 7, 6]
                ^
                Pivot in final position
   ```

10. Return `i` (= 3) as the pivot's index for the next recursive calls

</details>

## The Magic of Partitioning ✨

After partitioning, the pivot (`4`) is exactly where it would be in the sorted array!

```
[2, 1, 3, 4, 8, 5, 7, 6]
 < pivot   ^   > pivot
```

Now we can:
1. Recursively sort the left partition `[2, 1, 3]`
2. Recursively sort the right partition `[8, 5, 7, 6]`

## Partitioning Code 💻

Here's how the partitioning function looks in JavaScript:

```javascript
function partition(arr, low, high) {
  const pivot = arr[high]; // Using last element as pivot
  let i = low;             // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  
  // Swap arr[i] and arr[high] (put the pivot in its final position)
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i; // Return the pivot's index
}
```

> [!TIP]
> The partitioning step makes use of two pointers (`i` and `j`), which is a common pattern in array algorithms. The `i` pointer tracks the boundary between elements less than the pivot and elements greater than or equal to the pivot.

## Why is Partitioning Efficient? 🚀

Partitioning is an O(n) operation - we scan through the array just once with pointer `j`.

The beauty is that after a single scan:
1. One element (the pivot) is guaranteed to be in its final sorted position
2. All other elements are categorized on the correct side of the pivot

This is much more efficient than comparing every element with every other element (which would be O(n²)).

## Try It Yourself! 🎯

Try tracing through the partitioning process on paper with this array: `[9, 7, 5, 11, 12, 2, 14, 3, 10, 6]`

Use the last element (`6`) as the pivot.

In the next lesson, we'll see how Quick Sort combines partitioning with recursion to achieve a complete sorting algorithm. 