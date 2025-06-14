---
title: Analyzing the Algorithm's Efficiency
---

# ⚡ Algorithm Analysis

Understanding the efficiency of an algorithm is crucial for evaluating its performance, especially when dealing with large inputs. Let's analyze the time and space complexity of our activity selection algorithm.

## ⏱️ Time Complexity Analysis

Let's break down the operations in our algorithm:

1. **Sorting the activities by finish time**: 
   - Most efficient sorting algorithms run in O(n log n) time, where n is the number of activities.

2. **Selecting activities (iterative approach)**:
   - We iterate through the sorted activities once: O(n)
   - For each activity, we make a constant-time comparison: O(1)
   - Total for selection phase: O(n)

3. **Selecting activities (recursive approach)**:
   - In the worst case, we might need to scan through many activities to find the next compatible one
   - This could lead to O(n²) time complexity
   - However, with proper implementation (like using binary search to find the next compatible activity), this can be reduced to O(n log n)

**Overall Time Complexity**:
- Iterative approach: O(n log n) + O(n) = O(n log n)
- Recursive approach (naive): O(n log n) + O(n²) = O(n²)
- Recursive approach (optimized): O(n log n) + O(n log n) = O(n log n)

## 🔢 Making Time Complexity Intuitive

To understand what O(n log n) means in practical terms:

```
For n = 1,000 activities:
- log₂(1,000) ≈ 10
- n log n = 1,000 × 10 = 10,000 operations for sorting
- n = 1,000 operations for selection
- Total: ~11,000 operations

For n = 2,000 activities:
- log₂(2,000) ≈ 11
- n log n = 2,000 × 11 = 22,000 operations for sorting
- n = 2,000 operations for selection
- Total: ~24,000 operations
```

This means that if we double the input size, the processing time just slightly more than doubles. This is much better than quadratic growth (n²), where doubling the input would quadruple the processing time.

## 🗃️ Space Complexity Analysis

1. **Iterative approach**:
   - We need to store the sorted activities: O(n)
   - We need to store the selected activities: O(n) in the worst case
   - We use a constant amount of extra space for variables: O(1)
   - Total: O(n)

2. **Recursive approach**:
   - In addition to the above, we need space for the recursive call stack: O(n) in the worst case
   - Total: O(n)

**Overall Space Complexity**: O(n) for both approaches

## 📊 Performance Visualization

Here's a visualization of how the algorithm's performance scales with the number of activities:

![Algorithm Complexity Graph](https://i.imgur.com/mDyQvH5.png)

This logarithmic growth rate means our algorithm can efficiently handle even large sets of activities.

## 🔍 Practical Considerations

While the theoretical analysis gives us O(n log n) time complexity, there are practical factors to consider:

1. **Constant Factors**: The actual runtime will include constant factors that depend on the implementation details.

2. **Input Characteristics**: If the activities are already sorted or nearly sorted, some sorting algorithms can perform better than O(n log n).

3. **Memory Access Patterns**: The iterative approach generally has better cache locality than the recursive approach, which can lead to better performance on modern hardware.

4. **Language and Platform**: The efficiency of certain operations can vary based on the programming language and platform used.

## 💹 Comparing With Alternative Approaches

To truly appreciate the efficiency of our greedy approach, let's compare it with other methods:

### 1. Brute Force Approach
- **Strategy**: Try all possible combinations of activities and pick the largest valid set
- **Time Complexity**: O(2ⁿ) - exponential!
- **Practicality**: Only feasible for tiny inputs (less than 20-25 activities)

```
For n = 30 activities:
- 2³⁰ = 1,073,741,824 combinations to check!
- This would take seconds or minutes even on fast computers
```

### 2. Dynamic Programming (for standard activity selection)
- **Strategy**: Build up solutions to subproblems systematically
- **Time Complexity**: O(n²)
- **Practicality**: Works well for medium-sized inputs but less efficient than our greedy approach

```
For n = 1,000 activities:
- n² = 1,000,000 operations
- Much more than our 11,000 operations with the greedy approach
```

### 3. Our Greedy Approach
- **Strategy**: Always select the activity with the earliest finish time
- **Time Complexity**: O(n log n)
- **Practicality**: Efficient even for large inputs and simple to implement

```
For n = 1,000,000 activities:
- n log n = 20,000,000 operations (approx.)
- Can be processed in milliseconds on modern hardware
```

## 🧪 Edge Cases and Optimizations

Here are some edge cases to consider and potential optimizations:

1. **Empty input**: The algorithm should return an empty set.

2. **Single activity**: The algorithm should return that activity.

3. **Pre-sorted input**: If we know the activities are already sorted by finish time, we can skip the sorting step, reducing the complexity to O(n).

4. **Early termination**: If we only need to check if a certain number of activities can be scheduled (rather than finding the maximum), we can terminate the algorithm early once we've found enough activities.

## 💭 Thinking Exercise

Consider this scenario: What if we need to find the maximum number of activities that can be performed by two people instead of one? How would this change our approach and complexity? 

<details>
<summary>Hint</summary>

This becomes a more complex problem. One approach is to first find the maximum activities for one person using our algorithm, remove those from the pool, and then find the maximum activities for the second person from the remaining activities.

But that's not optimal! A better approach is to use a graph-based algorithm where we model activities as nodes and conflicts as edges, then solve it as a graph coloring problem with two colors.

This variant has a time complexity of O(n²) in a typical implementation.
</details>

In the next lesson, we'll explore real-world applications and variations of the activity selection problem. 