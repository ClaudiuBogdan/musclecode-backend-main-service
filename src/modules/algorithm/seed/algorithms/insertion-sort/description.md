# Insertion Sort

Insertion Sort is a simple and intuitive sorting algorithm that builds the final sorted array one element at a time. It works similarly to how most people sort playing cards in their hands, by taking one card at a time and inserting it into its correct position among the cards already sorted.

## The Challenge

Given an array of integers, implement a function to sort the array in ascending order using the Insertion Sort algorithm. The algorithm divides the array into two parts: a sorted portion and an unsorted portion. It then takes elements from the unsorted portion one by one and inserts them into their correct positions in the sorted portion.

### Example 1

```js
Input: nums = [29, 10, 14, 37, 14]
Output: [10, 14, 14, 29, 37]
```

_Explanation: The array is sorted in ascending order using Insertion Sort._

### Example 2

```js
Input: nums = [6, 2, 10, 7]
Output: [2, 6, 7, 10]
```

_Explanation: Each element is inserted into its correct position in the sorted subarray._

<details>
<summary>
### Speed and Efficiency
</summary>

Insertion Sort has varying performance characteristics depending on the input:

- **Time Complexity**:
  - **Best Case:** $O(n)$ when the array is already sorted.
  - **Average/Worst Case:** $O(n^2)$ when the array is in reverse order.
- **Space Complexity:** $O(1)$ as it sorts in-place, requiring only a constant amount of extra space.
</details>
<details>
<summary>
### Key Principles
</summary>

Insertion Sort is built on a few fundamental concepts:

- **Incremental Approach:** Builds the sorted array one element at a time.

- **In-Place Sorting:** Modifies the original array without requiring significant additional memory.

- **Stable Sorting:** Preserves the relative order of equal elements.

- **Adaptive Algorithm:** Performs better when the array is partially sorted.

- **Comparison-Based:** Uses element comparisons to determine the correct position for insertion.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Learn Insertion Sort in 7 minutes](https://www.youtube.com/watch?v=8mJ-OhcfpYg) - A concise video explanation of the algorithm
- [Insertion Sort Animation by Y. Daniel Liang](https://yongdanielliang.github.io/animation/web/InsertionSortNew.html) - Interactive step-by-step visualization
- [Sort Visualizer - Insertion Sort](https://www.sortvisualizer.com/insertionsort/) - Visual demonstration with performance metrics
- [VisuAlgo - Sorting](https://visualgo.net/en/sorting) - Comprehensive visualization of various sorting algorithms including Insertion Sort

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Insertion Sort, be mindful of these common challenges:

- **Inefficiency for Large Datasets:** Performance degrades significantly as the size of the data increases.

- **Overlooking Optimization Opportunities:** Not recognizing when early termination is possible.

- **Confusion with Shift vs. Swap:** Mistakenly implementing with swaps instead of shifts, which can be less efficient.

- **Edge Cases:** Not handling arrays with no elements or only one element properly.
</details>
<details>
<summary>
### When and Where to Use Insertion Sort
</summary>

Insertion Sort is ideal in scenarios such as:

- Small datasets where simplicity and low overhead are valued.

- Nearly sorted arrays where it can achieve close to linear time performance.

- As a component in more complex algorithms like Shellsort.

- Online sorting where elements arrive one at a time.

- When stability (preserving the relative order of equal elements) is required.

However, it may not be the best choice for:

- Large, randomly ordered datasets where more efficient algorithms like Quicksort or Mergesort would perform better.

- Performance-critical applications with substantial data volumes.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Insertion Sort finds practical use in various domains:

- **Library Card Catalogs:** Traditional manual sorting of cards.

- **Online Transaction Processing:** Where new records need to be inserted into an already sorted list.

- **Hybrid Sorting Algorithms:** Used as a subroutine in more complex sorting algorithms like Timsort.

- **Database Management:** For maintaining sorted indices on small tables.

- **Embedded Systems:** Where memory is limited and algorithm simplicity is valuable.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related sorting algorithms exist:

- **Binary Insertion Sort:** Uses binary search to find the insertion point, reducing comparisons.

- **Shell Sort:** An extension that sorts elements at specific intervals before applying insertion sort.

- **Gnome Sort:** A similar algorithm that moves elements backward until they're in the correct position.

- **Library Sort (Gapped Insertion Sort):** Leaves gaps in the array to reduce the number of shifts.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Insertion Sort is one of the oldest and most elementary sorting techniques, dating back to the early days of computing. Its intuitive nature mirrors how humans naturally sort items, making it a foundational algorithm in computer science education. Despite the development of more efficient algorithms, Insertion Sort remains relevant for its simplicity, low overhead, and effectiveness on small or nearly sorted datasets. It also serves as a building block for more sophisticated hybrid sorting algorithms like Timsort, which is used in programming languages such as Python and Java.
</details>