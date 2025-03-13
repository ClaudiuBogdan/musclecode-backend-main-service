---
title: The Optimized Hash Map Approach
---

# 🚀 The Hash Map Approach: A More Efficient Solution

> [!NOTE]
> In this lesson, we'll learn how to optimize the Two Sum solution using a hash map data structure.

## 🤔 The Key Insight: Complements

Before diving into the hash map approach, let's understand a key insight that makes this optimization possible:

For any number `x` in our array, we're looking for another number `y` such that `x + y = target`. We can rearrange this equation:
- `y = target - x`

We call `y` the **complement** of `x` (with respect to the target). If we can find `x`'s complement in the array, we've solved the problem!

## 🗺️ What is a Hash Map?

A hash map (also called a dictionary or object in some languages) is a data structure that stores key-value pairs and provides fast lookups. It's like an address book where you can quickly find someone's phone number if you know their name.

## 🧮 The Hash Map Approach for Two Sum

Instead of checking every pair, we can use a hash map to remember the numbers we've seen so far and quickly check if the complement of the current number exists:

1. Create an empty hash map to store numbers and their indices
2. Iterate through the array once
3. For each number, calculate its complement (target - current number)
4. Check if the complement exists in our hash map
   - If it does, we've found our pair!
   - If not, add the current number and its index to the hash map
5. Continue until we find a solution or reach the end of the array

## 📊 Visual Representation

Let's visualize this with an example: `nums = [2, 7, 11, 15]`, `target = 9`

```mermaid
graph TD
    A[Start with empty hash map] --> B[Process nums[0] = 2]
    B --> C[Calculate complement: 9 - 2 = 7]
    C --> D[Is 7 in hash map? No]
    D --> E[Add 2 to hash map with index 0]
    E --> F[Process nums[1] = 7]
    F --> G[Calculate complement: 9 - 7 = 2]
    G --> H[Is 2 in hash map? Yes, at index 0]
    H --> I[Found solution! Return [0, 1]]
```

## 💻 Code Implementation

Here's how the hash map approach looks in JavaScript:

```javascript
function twoSum(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return undefined; // No solution found
}
```

Let's break down this code:

- We create a new `Map` to store numbers and their indices
- We iterate through the array with a single loop
- For each number, we calculate its complement (`target - nums[i]`)
- We check if the complement exists in our map
  - If it does, we return the indices `[numMap.get(complement), i]`
  - If not, we add the current number and its index to the map
- If we reach the end without finding a solution, we return `undefined`

## ⏱️ Time and Space Complexity

### Time Complexity: O(n)
- We only need to iterate through the array once
- Hash map operations (insertion and lookup) are typically O(1) on average
- This makes the overall time complexity O(n)

### Space Complexity: O(n)
- In the worst case, we might need to store nearly all elements in the hash map
- This makes the space complexity O(n)

## 🚀 Comparing the Approaches

Let's compare the brute force and hash map approaches:

| Approach | Time Complexity | Space Complexity | Trade-off |
|----------|-----------------|------------------|-----------|
| Brute Force | O(n²) | O(1) | Simple but slow |
| Hash Map | O(n) | O(n) | Faster but uses more memory |

## 🧠 The Time-Space Trade-off

The hash map approach demonstrates a common pattern in algorithm optimization: trading space for time. By using extra memory (the hash map), we can dramatically reduce the time complexity from O(n²) to O(n).

> [!TIP]
> This time-space trade-off is a fundamental concept in algorithm design. Always consider if you can use additional data structures to optimize time complexity!

## 🔍 Step Through an Example

Let's trace through the hash map algorithm with this example:
```
nums = [3, 2, 4], target = 6
```

<details>
<summary>Step-by-Step Breakdown</summary>

1. Start with an empty map: `{}`
2. Process nums[0] = 3:
   - Complement: 6 - 3 = 3
   - Is 3 in map? No
   - Add to map: `{3: 0}`
3. Process nums[1] = 2:
   - Complement: 6 - 2 = 4
   - Is 4 in map? No
   - Add to map: `{3: 0, 2: 1}`
4. Process nums[2] = 4:
   - Complement: 6 - 4 = 2
   - Is 2 in map? Yes, at index 1
   - Return [1, 2]
</details>

## 💡 Key Takeaways

- The hash map approach reduces time complexity from O(n²) to O(n)
- It works by storing each number and checking if its complement exists
- This demonstrates how choosing the right data structure can dramatically improve efficiency
- We trade space complexity for time complexity

In the next lesson, we'll discuss some common pitfalls and edge cases to watch out for when implementing the Two Sum solution! 