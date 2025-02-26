# Two Sum Problem

The Two Sum problem is a classic algorithmic challenge that involves finding two numbers in an array that add up to a specific target value. It's frequently used in coding interviews to assess problem-solving skills and understanding of data structures.

## The Challenge

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

### Example 1

```js
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```

_Explanation: Because nums + nums[^1] = 2 + 7 = 9, we return[^1]._

### Example 2

```js
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```

_Explanation: Because nums[^1] + nums[^2] = 2 + 4 = 6, we return[^1][^2]._

### Example 3

```js
Input: nums = [3, 3], target = 6
Output: [0, 1]
```

_Explanation: Because nums + nums[^1] = 3 + 3 = 6, we return[^1]._

<details>
<summary>
### Speed and Efficiency
</summary>

The Two Sum problem can be approached with different methods, each with distinct efficiency characteristics:

- **Brute Force Approach**:
  - **Time Complexity:** $O(n^2)$ where n is the number of elements in the array, as we check every possible pair.
  - **Space Complexity:** $O(1)$ as it requires only a constant amount of extra space.

- **Hash Map Approach**:
  - **Time Complexity:** $O(n)$ as we only need to traverse the array once.
  - **Space Complexity:** $O(n)$ for storing elements in the hash map.

- **Two-Pointer Approach** (for sorted arrays):
  - **Time Complexity:** $O(n \log n)$ if the array needs to be sorted first, then $O(n)$ for the two-pointer traversal.
  - **Space Complexity:** $O(1)$ if using in-place sorting.
</details>
<details>
<summary>
### Key Principles
</summary>

The Two Sum problem relies on several fundamental concepts:

- **Complementary Pairs:** The core idea is finding pairs where one number is the complement of the other with respect to the target.

- **Hash Map Utilization:** Using a hash map to store previously seen values and their indices for efficient lookup.

- **Trade-off Between Time and Space:** The optimal solution trades space complexity for improved time complexity.

- **One-pass Algorithm:** The most efficient approach solves the problem in a single traversal of the array.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For visual learners, these resources provide excellent explanations of the Two Sum problem:

- [NeetCode - Two Sum Explained](https://www.youtube.com/watch?v=KLlXCFG5TnA) - Clear explanation with multiple approaches
- [Two Sum | LeetCode 1 | JavaScript | Easy](https://www.youtube.com/watch?v=isGKzmwDREg) - Detailed walkthrough of the problem
- [AlgoMonster - Two Sum Interactive Visualization](https://algo.monster/liteproblems/1) - Interactive visualization of the algorithm
- [LeetCode - Two Sum Problem](https://leetcode.com/problems/two-sum/) - Practice the problem with an online judge
</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing the Two Sum algorithm, watch out for these common mistakes:

- **Using the Same Element Twice:** Forgetting to ensure that the two indices are different.

- **Overlooking Edge Cases:** Not handling arrays with fewer than two elements.

- **Inefficient Implementation:** Defaulting to the brute force approach when a more efficient solution exists.

- **Incorrect Complement Calculation:** Miscalculating the complement value (target - current number).

- **Hash Map Lookup Timing:** Checking for the complement before adding the current element to the hash map, which could miss valid pairs.
</details>
<details>
<summary>
### When and Where to Use Two Sum
</summary>

The Two Sum problem and its solution approaches are applicable in various scenarios:

- **Financial Applications:** Finding pairs of transactions that sum to a specific amount.

- **Data Analysis:** Identifying pairs of data points whose values satisfy certain conditions.

- **Game Development:** Matching pairs of game elements that combine to create specific effects.

- **Cryptography:** In certain algorithms where finding number pairs with specific properties is required.

The hash map approach is particularly useful when:
- You need an efficient solution for large datasets.
- The array is unsorted and sorting would be costly.
- You can afford the additional space for the hash map.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The Two Sum problem extends beyond coding interviews into practical applications:

- **E-commerce Systems:** Finding product combinations that fit within a customer's budget.

- **Financial Portfolio Management:** Identifying asset pairs that balance risk and return.

- **Recommendation Systems:** Suggesting complementary items that together satisfy user preferences.

- **Network Routing:** Finding pairs of paths that meet specific latency or bandwidth requirements.

- **Scientific Computing:** Identifying pairs of data points that satisfy experimental constraints.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations of the Two Sum problem exist:

- **Three Sum:** Finding three numbers in an array that add up to a specific target.

- **Four Sum:** Extending to four numbers that sum to the target.

- **Two Sum II (Input Array Is Sorted):** A variation where the input array is already sorted.

- **Two Sum - Less Than or Equal to Target:** Finding pairs whose sum is less than or equal to the target.

- **Two Sum - Closest to Target:** Finding the pair whose sum is closest to the target value.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Two Sum problem has become a staple in computer science education and technical interviews. Its popularity stems from its simplicity in statement yet the variety of approaches it can be solved with, making it an excellent gauge of a programmer's problem-solving abilities and understanding of data structures. The problem showcases the evolution of algorithmic thinking from brute force approaches to more sophisticated techniques that leverage additional data structures to achieve optimal performance.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

**Brute Force Approach:**
```
function twoSum(nums, target):
    for i from 0 to length(nums) - 1:
        for j from i + 1 to length(nums) - 1:
            if nums[i] + nums[j] == target:
                return [i, j]
    return [] // No solution found (though problem states there is always one solution)
```

**Hash Map Approach:**
```
function twoSum(nums, target):
    // Create an empty hash map
    map = new HashMap()
    
    // Iterate through the array
    for i from 0 to length(nums) - 1:
        // Calculate the complement
        complement = target - nums[i]
        
        // Check if the complement exists in the map
        if map contains complement:
            return [map.get(complement), i]
        
        // Add the current number and its index to the map
        map.put(nums[i], i)
    
    return [] // No solution found
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of the hash map approach for the Two Sum problem can be proven as follows:

1. **Completeness:** The algorithm examines each element in the array exactly once.

2. **Invariant:** At each step, the hash map contains all previously seen elements and their indices.

3. **Correctness of Match:** For each element nums[i], we check if its complement (target - nums[i]) exists in the hash map:
   - If it does, we've found a pair that sums to the target.
   - The indices returned are the current index i and the index of the complement from the hash map.

4. **Termination:** The algorithm terminates when either:
   - A pair is found (returning the indices).
   - All elements are processed (though the problem guarantees a solution exists).

5. **Uniqueness of Solution:** The problem states there is exactly one solution, so we don't need to handle multiple solutions.

6. **No Self-Use:** By checking for the complement before adding the current element to the hash map, we ensure we don't use the same element twice.

This proof demonstrates that the hash map approach will always find the correct pair of indices if a solution exists, and it will do so in a single pass through the array.
</details>