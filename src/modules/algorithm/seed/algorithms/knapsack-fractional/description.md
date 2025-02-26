# Fractional Knapsack Algorithm

The Fractional Knapsack Algorithm is a greedy optimization technique that solves the problem of maximizing value when filling a container with divisible items, each having specific weights and values. Unlike the 0-1 Knapsack problem, this algorithm allows taking fractions of items, making it particularly useful for scenarios involving divisible resources.

## The Challenge

Given a set of items, each with a weight `w_i` and a value `v_i`, along with a knapsack of capacity `W`, implement a function that selects items (possibly in fractions) to maximize the total value while ensuring the total weight doesn't exceed `W`.

### Example 1

```js
Input: weights = [10, 20, 30], values = [60, 100, 120], capacity = 50
Output: 240
```

_Explanation: Take the entire first item (weight 10, value 60), the entire second item (weight 20, value 100), and 2/3 of the third item (weight 20, value 80), for a total value of 240._

### Example 2

```js
Input: weights = [3, 3, 2, 5, 1], values = [10, 15, 10, 12, 8], capacity = 10
Output: 43
```

_Explanation: After sorting by value/weight ratio, we take the optimal combination of items to maximize value._

<details>
<summary>
### Speed and Efficiency
</summary>

The Fractional Knapsack Algorithm offers efficient performance:

- **Time Complexity**:
  - **Overall:** O(n log n), where n is the number of items. This is dominated by the sorting of items by their value-to-weight ratio.
  - **After sorting:** O(n) to process the items in order.
- **Space Complexity:** O(1) if we sort in place, or O(n) if we create a new sorted array.
</details>
<details>
<summary>
### Key Principles
</summary>

The Fractional Knapsack Algorithm relies on several fundamental concepts:

- **Greedy Choice Property:** Always choose the item with the highest value-to-weight ratio first.

- **Optimal Substructure:** The optimal solution includes the greedy choice plus the optimal solution to the remaining subproblem.

- **Fractional Selection:** Unlike 0-1 Knapsack, items can be broken into fractions to exactly fill the knapsack capacity.

- **Value Density Prioritization:** Items are ranked by their value per unit weight (v_i/w_i).
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Fractional Knapsack Problem | GeeksforGeeks](https://www.youtube.com/watch?v=m1p-eWxrt6g) - Visual explanation with examples
- [Master the Fractional Knapsack Problem in Java](https://www.youtube.com/watch?v=_kr-_jR51Ok) - Step-by-step code walkthrough
- [Fractional Knapsack Problem using Greedy Algorithm Test](https://testlify.com/test-library/fractional-knapsack-problem-using-greedy-algorithm/) - Interactive learning platform
- [CS Visualizations](https://www.cs.usfca.edu/~galles/visualization/Knapsack.html) - Interactive visualization tool

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using the Fractional Knapsack Algorithm, be mindful of these common challenges:

- **Incorrect Sorting:** Failing to sort items by value-to-weight ratio rather than just value or weight.

- **Integer Division:** Using integer division when calculating value-to-weight ratios, which can lead to precision loss.

- **Boundary Conditions:** Not handling edge cases like empty arrays or zero weights properly.

- **Confusion with 0-1 Knapsack:** Mistakenly applying the fractional approach to problems requiring whole items.
</details>
<details>
<summary>
### When and Where to Use Fractional Knapsack
</summary>

The Fractional Knapsack Algorithm is ideal in scenarios such as:

- Resource allocation problems where resources are divisible (like liquids, powders, or continuous materials).

- Budget optimization when partial investments are possible.

- Time management when tasks can be partially completed.

- Cargo loading when items can be split or cut.

However, it may not be the best choice for:

- Problems involving discrete, indivisible items (use 0-1 Knapsack instead).

- Scenarios where taking a fraction of an item doesn't make practical sense.

- Problems with additional constraints beyond weight and value.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The Fractional Knapsack Algorithm has numerous practical applications:

- **Logistics and Transportation:** Optimizing cargo loading when materials can be divided.

- **Resource Allocation:** Distributing limited resources across multiple projects.

- **Investment Portfolio Management:** Allocating capital across different investment opportunities.

- **Production Planning:** Determining the optimal mix of products to manufacture.

- **Cloud Computing:** Allocating computational resources among different tasks.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several algorithms are related to or extend the Fractional Knapsack concept:

- **0-1 Knapsack Problem:** The discrete version where items cannot be divided.

- **Bounded Knapsack Problem:** Where multiple copies of each item are available, but limited.

- **Multiple Knapsack Problem:** Involving multiple containers with different capacities.

- **Multi-dimensional Knapsack Problem:** With multiple resource constraints beyond just weight.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Knapsack problem family, including the Fractional Knapsack variant, has been studied since the early days of operations research and computer science. The greedy approach to solving the Fractional Knapsack problem was formalized in the 1950s and has since become a classic example in algorithm design courses to demonstrate how greedy algorithms can provide optimal solutions for certain problem types. It serves as an important contrast to the dynamic programming approach required for the 0-1 Knapsack problem, highlighting how a seemingly small change in problem formulation can significantly impact computational complexity.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
function fractionalKnapsack(weights, values, capacity):
    // Create array of item pairs (weight, value)
    items = []
    for i from 0 to length(weights) - 1:
        items.append((weights[i], values[i]))
    
    // Calculate value-to-weight ratio for each item
    // and sort in descending order of this ratio
    sort items by values[i]/weights[i] in descending order
    
    totalValue = 0
    remainingCapacity = capacity
    
    // Process items in order of decreasing value/weight ratio
    for each (weight, value) in items:
        if remainingCapacity >= weight:
            // Take the whole item
            totalValue += value
            remainingCapacity -= weight
        else:
            // Take a fraction of the item
            fraction = remainingCapacity / weight
            totalValue += value * fraction
            break  // Knapsack is full
    
    return totalValue
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of the Fractional Knapsack Algorithm can be proven through the following logical steps:

1. **Greedy Choice Property:** Taking items with the highest value-to-weight ratio first is always optimal because:
   - For any two items with ratios r₁ > r₂, replacing any fraction of item 2 with the same weight of item 1 will always increase total value
   - This holds true regardless of what other items are selected

2. **Optimal Substructure:** After selecting the first item (or fraction), the remaining problem is a smaller instance of the same problem:
   - If we have an optimal solution for the original problem, removing the first choice must yield an optimal solution for the remaining capacity

3. **Completeness:** The algorithm considers all items and sorts them by value density, ensuring no potentially better option is overlooked

4. **Termination:** The algorithm terminates when either:
   - All items have been considered, or
   - The knapsack is completely filled (remaining capacity = 0)

5. **Optimality:** At each step, the algorithm makes the locally optimal choice (highest value per unit weight), which, for this problem, leads to the globally optimal solution

This proof demonstrates that the Fractional Knapsack Algorithm will always produce the maximum possible value given the constraints, making it a true greedy algorithm where local optimality leads to global optimality.
</details>