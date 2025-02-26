# Maximum Subarray Sum (Kadane's Algorithm)

Kadane's Algorithm is an elegant and efficient technique for solving the maximum subarray problem. This dynamic programming approach finds the contiguous subarray within a one-dimensional array of numbers that has the largest sum, making it a fundamental algorithm in computer science and competitive programming.

## The Challenge

Given an array of integers `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. The array may contain both positive and negative integers.

### Example 1

```js
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
```

_Explanation: The contiguous subarray [4, -1, 2, 1] has the largest sum = 6._

### Example 2

```js
Input: nums = [5, 4, -1, 7, 8]
Output: 23
```

_Explanation: The contiguous subarray [5, 4, -1, 7, 8] has the largest sum = 23._

<details>
<summary>
### Speed and Efficiency
</summary>

Kadane's Algorithm is remarkably efficient:

- **Time Complexity**: O(n), where n is the length of the array. The algorithm makes a single pass through the array.
- **Space Complexity**: O(1), as it only uses a constant amount of extra space regardless of input size.

This efficiency makes it significantly faster than the naive O(n³) or even the improved O(n²) approaches for the same problem.
</details>
<details>
<summary>
### Key Principles
</summary>

Kadane's Algorithm is built on these fundamental concepts:

- **Dynamic Programming**: It uses previously computed results to make decisions about the current element.

- **Local vs. Global Maximum**: The algorithm tracks both the maximum sum ending at the current position (local) and the maximum sum found so far (global).

- **Subproblem Optimization**: At each step, it decides whether to start a new subarray or extend the existing one based on which yields a higher sum.

- **Greedy Choice**: For each element, it makes the locally optimal choice that leads to the globally optimal solution.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Kadane's Algorithm Explanation with Animation](https://www.youtube.com/watch?v=W-LHVqKkCOY) - Visual walkthrough of the algorithm
- [Kadane's Algorithm - Maximum Subarray (Dynamic Programming)](https://www.youtube.com/watch?v=tmakGVOGV3A) - Detailed explanation with examples
- [Youcademy's Interactive Tutorial on Kadane's Algorithm](https://youcademy.org/kadanes-maximum-subarray-sum-algorithm/) - Interactive learning platform
- [TakeUForward's Kadane's Algorithm Tutorial](https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/) - Step-by-step guide with examples

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Kadane's Algorithm, be mindful of these common challenges:

- **All Negative Elements**: Forgetting to handle the case where all array elements are negative (the maximum subarray would be the single largest element).

- **Empty Subarrays**: Some problem variants allow empty subarrays (with sum 0), while others require at least one element.

- **Initialization Issues**: Incorrectly initializing the maximum sum variables can lead to wrong results.

- **Tracking Subarray Indices**: Not keeping track of the start and end indices of the maximum subarray when needed.
</details>
<details>
<summary>
### When and Where to Use Kadane's Algorithm
</summary>

Kadane's Algorithm is ideal in scenarios such as:

- Finding maximum profit in stock trading (with a single buy and sell).

- Signal processing to identify the strongest segment of a signal.

- Image processing for finding the brightest or darkest region in a 1D scan.

- Any problem requiring the maximum sum contiguous subarray.

However, it may not be the best choice for:

- 2D maximum subarray problems (though it can be adapted).

- Problems requiring non-contiguous selections.

- Situations where the original array order cannot be maintained.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Kadane's Algorithm has practical applications in various fields:

- **Financial Analysis**: Identifying periods of maximum growth or decline in stock prices.

- **Genomics**: Finding regions of DNA with specific properties.

- **Computer Vision**: Detecting regions of interest in 1D image scans.

- **Time Series Analysis**: Identifying trends in temporal data.

- **Resource Allocation**: Optimizing resource distribution over contiguous time periods.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and extensions of Kadane's Algorithm exist:

- **Circular Maximum Subarray**: Finding the maximum subarray sum in a circular array.

- **Maximum Subarray Product**: Finding the contiguous subarray with the largest product.

- **2D Kadane's Algorithm**: Extension to find the maximum sum submatrix in a 2D array.

- **Maximum Sum with K Elements**: Finding the maximum sum subarray with exactly K elements.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Kadane's Algorithm was developed by Joseph Born Kadane, a statistician at Carnegie Mellon University. The algorithm emerged as a solution to the maximum subarray problem, which was first posed in the 1970s. Despite its simplicity, it represents a significant breakthrough in applying dynamic programming principles to solve a common computational problem efficiently. The algorithm has since become a standard technique taught in computer science curricula and used in competitive programming.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
function kadaneMaxSubarraySum(array):
    // Initialize variables to track maximum sums
    max_so_far = array[^0]
    max_ending_here = array[^0]
    
    // Iterate through the array starting from the second element
    for i from 1 to length(array) - 1:
        // Either extend the existing subarray or start a new one
        max_ending_here = max(array[i], max_ending_here + array[i])
        
        // Update the global maximum if needed
        max_so_far = max(max_so_far, max_ending_here)
    
    // Return the maximum subarray sum
    return max_so_far
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of Kadane's Algorithm can be proven through these logical steps:

1. **Inductive Base**: For a single-element array, the maximum subarray is the element itself, which the algorithm correctly identifies.

2. **Inductive Step**: Assume the algorithm correctly finds the maximum subarray sum for all arrays of length k. For an array of length k+1:
   - The maximum subarray either includes the (k+1)th element or it doesn't
   - If it doesn't, the solution is the same as for the k-length array (handled by max_so_far)
   - If it does, the maximum must be the best subarray ending at position k+1 (handled by max_ending_here)

3. **Optimal Substructure**: The maximum subarray ending at position i is either:
   - The element at position i alone, or
   - The element at position i plus the maximum subarray ending at position i-1
   
   This is correctly captured by the recurrence relation:
   max_ending_here = max(array[i], max_ending_here + array[i])

4. **Global Optimality**: By tracking the maximum of all local maxima (max_so_far), the algorithm guarantees finding the global maximum subarray sum.

5. **Termination**: The algorithm processes each array element exactly once and terminates after examining all elements.

This proof demonstrates that Kadane's Algorithm will always find the maximum subarray sum in a given array, regardless of the distribution of positive and negative values.
</details>