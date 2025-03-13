---
title: Implementation Walkthrough
---

# 💻 Implementation Walkthrough: Job Sequencing

Now that we understand the algorithm steps, let's implement the Job Sequencing with Deadlines algorithm in JavaScript. We'll walk through the implementation step by step, explaining each part of the code.

## Function Signature 📝

Let's start by defining our function signature:

```javascript
/**
 * Implements the job sequencing algorithm to maximize profit.
 *
 * @param jobs - An array of jobs with their profit and deadline
 * @returns The sequence of job IDs that maximizes profit
 */
function jobSequencing(jobs) {
  // Implementation will go here
}
```

Each job in the input array is expected to have the following properties:
- `id`: A unique identifier for the job
- `profit`: The profit gained by completing the job
- `deadline`: The deadline by which the job must be completed

## Step 1: Sorting Jobs by Profit 📊

First, we sort the jobs in decreasing order of profit:

```javascript
// Sort jobs by profit in descending order
jobs.sort((a, b) => b.profit - a.profit);
```

> [!NOTE]
> We use the comparator function `(a, b) => b.profit - a.profit` to sort in descending order. For ascending order, we would use `a.profit - b.profit`.

## Step 2: Finding the Maximum Deadline ⏰

Next, we need to determine the maximum deadline among all jobs:

```javascript
// Find the maximum deadline
let maxDeadline = 0;
for (const job of jobs) {
  maxDeadline = Math.max(maxDeadline, job.deadline);
}
```

> [!TIP]
> We could also use `jobs.reduce((max, job) => Math.max(max, job.deadline), 0)` for a more functional approach.

## Step 3: Initializing Data Structures 🏗️

We need to initialize two main data structures:

```javascript
// Initialize an array to keep track of time slots
const timeSlots = new Array(maxDeadline).fill(null);
const result = [];
```

The `timeSlots` array represents our schedule, where:
- Each index corresponds to a time slot (0-indexed)
- `null` means the slot is available
- A job ID means the slot is assigned to that job

## Step 4: Assigning Jobs to Slots 🔄

Now comes the core algorithm, where we assign each job to an appropriate slot:

```javascript
// Iterate through the sorted jobs and schedule them
for (const job of jobs) {
  // Find the latest available slot for the job
  for (let i = job.deadline - 1; i >= 0; i--) {
    if (timeSlots[i] === null) {
      timeSlots[i] = job.id;
      result.push(job.id);
      break;
    }
  }
}
```

Let's break down what's happening here:

1. We iterate through each job in order of decreasing profit
2. For each job, we try to find an available slot, starting from the slot just before its deadline and moving backward
3. When we find an available slot, we assign the job to that slot and add its ID to our result array
4. If we don't find any available slot, we skip the job and move to the next one

<details>
<summary>Why do we check slots starting from job.deadline - 1?</summary>

We use 0-indexed time slots, so a job with deadline `d` can be assigned to slots `0` through `d-1`.

For example, a job with deadline 3 can be assigned to slots 0, 1, or 2 (not 3).
</details>

## Step 5: Returning the Result 🏁

Finally, we return the array of job IDs that were selected for our schedule:

```javascript
return result;
```

## Complete Implementation 🧩

Here's the complete implementation of the Job Sequencing algorithm:

```javascript
/**
 * Implements the job sequencing algorithm to maximize profit.
 *
 * @param jobs - An array of jobs with their profit and deadline
 * @returns The sequence of job IDs that maximizes profit
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function jobSequencing(jobs) {
  // Sort jobs by profit in descending order
  jobs.sort((a, b) => b.profit - a.profit);

  // Find the maximum deadline
  let maxDeadline = 0;
  for (const job of jobs) {
    maxDeadline = Math.max(maxDeadline, job.deadline);
  }

  // Initialize an array to keep track of time slots
  const timeSlots = new Array(maxDeadline).fill(null);
  const result = [];

  // Iterate through the sorted jobs and schedule them
  for (const job of jobs) {
    // Find the latest available slot for the job
    for (let i = job.deadline - 1; i >= 0; i--) {
      if (timeSlots[i] === null) {
        timeSlots[i] = job.id;
        result.push(job.id);
        break;
      }
    }
  }

  return result;
}
```

## Testing the Implementation ✅

Let's test our implementation with a few examples:

### Example 1:

```javascript
const jobs = [
  { id: 'J1', profit: 85, deadline: 5 },
  { id: 'J2', profit: 25, deadline: 4 },
  { id: 'J3', profit: 16, deadline: 3 },
  { id: 'J4', profit: 40, deadline: 3 },
];

console.log(jobSequencing(jobs)); // Expected: ['J1', 'J4', 'J3']
```

In this example, the algorithm should select jobs J1, J4, and J3, with a total profit of 85 + 40 + 16 = 141.

### Example 2:

```javascript
const jobs = [
  { id: 'a', profit: 100, deadline: 2 },
  { id: 'b', profit: 20, deadline: 2 },
  { id: 'c', profit: 40, deadline: 1 },
  { id: 'd', profit: 35, deadline: 3 },
];

console.log(jobSequencing(jobs)); // Expected: ['c', 'a', 'd']
```

Here, the algorithm should select jobs a, c, and d, with a total profit of 100 + 40 + 35 = 175.

## Edge Cases and Improvements 🔧

### Handling Empty Input

Our implementation handles empty job arrays correctly, as it would initialize and return an empty result.

### Same Profit Values

When two jobs have the same profit, the sort order is not guaranteed. This could affect the result if there are limited slots available. You might want to add a secondary sorting criterion, like:

```javascript
jobs.sort((a, b) => {
  // First sort by profit (descending)
  if (b.profit !== a.profit) return b.profit - a.profit;
  // Then by deadline (ascending) as a tiebreaker
  return a.deadline - b.deadline;
});
```

### Optimization Opportunity

For larger inputs, the nested loop in our implementation can be inefficient with a time complexity of O(n²). We could optimize this using a disjoint set data structure to find available slots more efficiently, reducing the time complexity to O(n log n).

> [!TIP]
> When implementing algorithms, always think about edge cases and potential optimizations, even after you have a working solution.

## Reflection Questions ✨

1. How would our implementation handle a case where all jobs have the same deadline?

2. Could we use a different data structure instead of an array for tracking time slots? What would be the advantages or disadvantages?

3. How would you modify the implementation to return the actual schedule (which job runs on which day) instead of just the list of selected jobs?

In the next lesson, we'll analyze the time and space complexity of our implementation in more detail. 