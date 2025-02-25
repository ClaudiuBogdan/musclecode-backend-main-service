# Quick Sort

Quick Sort is a highly efficient divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions the array around it. It's one of the most widely used sorting algorithms due to its performance and relatively simple implementation.

## The Challenge

Given an array of integers, implement the Quick Sort algorithm to sort the array in ascending order. The algorithm works by selecting a pivot element, partitioning the array so that elements less than the pivot come before it and elements greater than the pivot come after it, then recursively applying the same process to the sub-arrays.

### Example 1

```js
Input: nums = [20, 13, 3, 2, 10, 1, 5, 6]
Output: [1, 2, 3, 5, 6, 10, 13, 20]
```

_Explanation: The array is sorted in ascending order using the Quick Sort algorithm._

### Example 2

```js
Input: nums = [64, 34, 25, 12, 22, 11, 90, 5]
Output: [5, 11, 12, 22, 25, 34, 64, 90]
```

_Explanation: The array is sorted in ascending order using the Quick Sort algorithm._

<details>
<summary>
### Speed and Efficiency
</summary>

Quick Sort is known for its efficiency in most practical scenarios:

- **Time Complexity**:
  - **Best/Average Case:** $O(n \log n)$ when the pivot divides the array into roughly equal halves.
  - **Worst Case:** $O(n^2)$ when the pivot consistently results in highly unbalanced partitions (e.g., already sorted array with last element as pivot).
- **Space Complexity:** $O(\log n)$ for the recursion stack in the average case, but can be $O(n)$ in the worst case.
</details>
<details>
<summary>
### Key Principles
</summary>

Quick Sort is built on several fundamental concepts:

- **Divide and Conquer:** Breaks the problem into smaller subproblems, solves them independently, and combines their solutions.

- **Partitioning:** Rearranges elements around a pivot so that elements less than the pivot are on the left and greater elements are on the right.

- **In-place Sorting:** Requires minimal additional memory as it sorts the array within itself.

- **Recursion:** Applies the same sorting process to the sub-arrays created after partitioning.

- **Pivot Selection:** The choice of pivot significantly impacts performance; common strategies include selecting the first, last, middle, or random element.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Algorithms: Quicksort - HackerRank](https://www.youtube.com/watch?v=SLauY6PpjW4) - Clear explanation of the algorithm with visualization
- [VisuAlgo - Sorting](https://visualgo.net/en/sorting) - Interactive visualization of various sorting algorithms including Quick Sort
- [Understanding Quicksort with Interactive Demo](https://me.dt.in.th/page/Quicksort/) - Interactive demonstration of how Quick Sort works
</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Quick Sort, be mindful of these common challenges:

- **Poor Pivot Selection:** Choosing a bad pivot (like the first or last element in a nearly sorted array) can lead to worst-case performance.

- **Stack Overflow:** Deep recursion on large arrays can exceed the stack size limit.

- **Handling Duplicates:** Standard implementations may not handle duplicates efficiently.

- **Stability:** Quick Sort is not stable by default (equal elements may change relative order).

- **Small Arrays:** For very small arrays, the overhead of recursion might make simpler algorithms like Insertion Sort more efficient.
</details>
<details>
<summary>
### When and Where to Use Quick Sort
</summary>

Quick Sort is ideal in scenarios such as:

- General-purpose sorting where average-case performance is important.

- Systems with good cache locality, as it works well with memory hierarchies.

- When in-place sorting is required to conserve memory.

- Situations where worst-case scenarios are rare or can be mitigated with good pivot selection.

However, it may not be the best choice for:

- Applications requiring stable sorting.

- Sorting linked lists (where random access is inefficient).

- Systems where worst-case guarantees are critical.

- Very small arrays where simpler algorithms have less overhead.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Quick Sort is widely used in various domains:

- **Programming Languages:** Many standard library sort functions use Quick Sort or its variants.

- **Database Systems:** For sorting records and optimizing query execution.

- **Operating Systems:** In memory management and file systems.

- **Graphics Applications:** For sorting objects by depth or other properties.

- **Network Routing:** For efficiently organizing routing tables.

- **Computational Geometry:** In algorithms requiring sorted points or lines.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations of Quick Sort address its limitations or optimize for specific scenarios:

- **Randomized Quick Sort:** Selects pivots randomly to avoid worst-case scenarios.

- **Dual-Pivot Quick Sort:** Uses two pivots to create three partitions, often reducing the number of comparisons.

- **Three-Way Quick Sort (Dutch National Flag):** Handles duplicates efficiently by creating three partitions (less than, equal to, and greater than the pivot).

- **Introspective Sort (Introsort):** Combines Quick Sort with Heap Sort to guarantee O(n log n) worst-case performance.

- **Quick Sort with Insertion Sort:** Uses Insertion Sort for small subarrays to reduce recursion overhead.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Quick Sort was developed by British computer scientist Tony Hoare in 1959 while he was an exchange student at Moscow State University. He was working on a machine translation project for the National Physical Laboratory and needed an efficient sorting algorithm. The algorithm was published in 1961 and has since become one of the most studied and widely implemented sorting algorithms. Despite being over 60 years old, Quick Sort remains relevant and efficient for modern computing needs, with numerous optimizations and variations developed over the decades to address its few weaknesses.
</details>