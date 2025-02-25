# Binary Search

Binary Search is a highly efficient searching algorithm designed to find a target element within a sorted array. It exemplifies the divide-and-conquer paradigm in computer science, making it one of the fundamental algorithms in the field.

## The Challenge

Given an array of **distinct** integers `nums` sorted in **ascending order**, and a target integer `target`, implement a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`. You must write an algorithm with $O(log n)$ runtime complexity.

### Example 1

```js
Input: (nums = [-1, 0, 2, 4, 6, 8]), (target = 4);
Output: 3;
```

_Explanation: The number 4 is found at index 3._

### Example 2

```js
Input: (nums = [-1, 0, 2, 4, 6, 8]), (target = 3);
Output: -1;
```

_Explanation: The number 3 is not present in the array, so the function returns -1._

<details>
<summary>
### Speed and Efficiency
</summary>

Binary Search is celebrated for its speed:

- **Time Complexity**:
  - **Best Case:** $O(1)$ when the target happens to be at the middle.
  - **Average/Worst Case:** $O(\log n)$ , because the search region is halved on each iteration.
- **Space Complexity:** $O(1)$ when implemented in an iterative manner.
</details>

<details>
<summary>
### Key Principles
</summary>

Binary Search is built on a few fundamental concepts:

- **Divide and Conquer:** Breaks the problem into smaller chunks by splitting the search interval in half each time.
- **Sorted Array Requirement:** The array must be pre-sorted to effectively eliminate half of the search space.
- **Comparison-Driven:** Each step involves comparing the target to the middle element.
- **Halving the Search Space:** Consistently reduces the number of remaining elements by half until the target is found or the list is exhausted.

</details>

<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Binary Search Algorithm in 100 Seconds](https://www.youtube.com/watch?v=MFhxShGxHWc)
- [Binary Search - FreeCodeCamp](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=2367s)
- [Visualgo](https://visualgo.net/en)
- [Yongdanielliang Animation](https://yongdanielliang.github.io/animation/web/BinarySearchNew.html)
- [CSUSFCA Visualization](https://www.cs.usfca.edu/~galles/visualization/Search.html)
- [Mathwarehouse Comparison of Binary vs Linear Search](https://www.mathwarehouse.com/programming/gifs/binary-vs-linear-search.php)
</details>

<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Binary Search, be mindful of these common challenges:

- **Off-by-One Errors:** Miscalculating the boundaries can lead to missing the target.
- **Integer Overflow:** Calculating the middle index as `(left+right)/2` without proper handling can lead to issues.
- **Assumptions:** Always ensure the input array is sorted.
- **Edge Cases:** Consider arrays with no elements, only one element, or even duplicate values in different scenarios—even though duplicates are not allowed in this particular problem.
</details>

<details>
<summary>
### When and Where to Use Binary Search
</summary>

Binary Search is ideal in scenarios such as:

- Large collections of sorted data where speed matters.
- Static datasets where frequent searches are required.
- Environments with limited memory, thanks to its constant space usage.

However, it may not be the best choice for:

- Small datasets, where a simple linear search could be more straightforward.
- Data that frequently changes, requiring constant re-sorting.
- Structures like linked lists that do not allow for quick random access.
</details>

<details>
<summary>
### Real-World Applications
</summary>

Binary Search isn’t just a theoretical concept—it’s used in many practical areas, including:

- **Database Systems:** Quickly locating records within sorted indices.
- **File Systems:** Efficiently searching for files in an ordered directory list.
- **High-Frequency Trading:** Rapid decision-making based on sorted financial data.
- **Dictionary Applications:** Implementing word lookups and spell-checks.
- **Version Control Systems:** Searching through commits efficiently.
</details>

<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized algorithms extend or modify Binary Search:

- **Exponential Search:** Tailored for unbounded or very large arrays.
- **Interpolation Search:** Optimized for scenarios where the data values are uniformly distributed.
- **Fibonacci Search:** Uses Fibonacci numbers to determine the search intervals.
- **Binary Search:** Adapted to environments where comparisons might be unreliable.
</details>

<details>
<summary>
### A Brief Look at History
</summary>

Binary search has a fascinating history in computer science. It was first conceptualized by John Mauchly in 1946, marking one of the first published discussions of non-numerical programming methods. The first bug-free implementation wasn't published until 1962 by Thomas N. Hibbard, demonstrating the algorithm's deceptive complexity.

</details>
