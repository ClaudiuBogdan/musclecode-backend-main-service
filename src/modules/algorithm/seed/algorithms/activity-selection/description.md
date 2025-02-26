# Activity Selection Algorithm

The Activity Selection Algorithm is a greedy algorithm designed to select the maximum number of non-conflicting activities that can be performed by a single person or machine within a given time frame. It exemplifies the power of the greedy approach in solving optimization problems efficiently.

## The Challenge

Given a set of activities, each with a start time and finish time, select the maximum number of activities that can be performed without overlap. The algorithm aims to maximize the count of activities that can be executed, not the total duration of time used.

### Example 1

```js
Input: activities = [{name: "a", start: 9, end: 13, weight: 300}, 
                     {name: "b", start: 11, end: 14, weight: 250}, 
                     {name: "c", start: 16, end: 18, weight: 400}, 
                     {name: "d", start: 15, end: 21, weight: 450}]
Output: ["a", "d"]
```

_Explanation: Activities a and d don't overlap and give the maximum possible selection of 2 activities._

### Example 2

```js
Input: activities = [{start: 1, end: 3}, {start: 2, end: 5}, 
                     {start: 4, end: 6}, {start: 6, end: 7}, 
                     {start: 5, end: 9}, {start: 8, end: 9}]
Output: [{start: 1, end: 3}, {start: 4, end: 6}, {start: 6, end: 7}, {start: 8, end: 9}]
```

_Explanation: These four activities don't overlap and represent the maximum possible selection._

<details>
<summary>
### Speed and Efficiency
</summary>

The Activity Selection Algorithm is remarkably efficient:

- **Time Complexity**:
  - **Overall:** O(n log n), where the dominant factor is sorting the activities by finish time.
  - **Selection Process:** O(n) after sorting.
- **Space Complexity:** O(1) for the selection process itself, or O(n) if storing the selected activities.
</details>
<details>
<summary>
### Key Principles
</summary>

The Activity Selection Algorithm operates on several fundamental concepts:

- **Greedy Choice Property:** Always select the activity with the earliest finish time among the remaining compatible activities.

- **Optimal Substructure:** The problem can be broken down into smaller subproblems, each with its own optimal solution.

- **Sorting Requirement:** Activities must be sorted by finish time for the greedy approach to work correctly.

- **Non-overlapping Constraint:** Two activities are compatible if their time intervals don't overlap.

- **Maximization Goal:** The objective is to maximize the number of activities, not the total time utilized.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Activity Selection Problem using Greedy Method | Code with Scaler](https://www.youtube.com/watch?v=V0ZrLuIVzaY) - A comprehensive video explanation of the algorithm
- [Greedy Algorithm: Activity Selection](https://www.youtube.com/watch?v=Qz6D7mrxaJM) - Clear explanation with step-by-step walkthrough
- [Recursive Greedy Algorithm for Activity Selection](https://www.youtube.com/watch?v=alybycFq2mU) - Covers the recursive implementation approach
- [Scaler's Interactive Guide to Activity Selection](https://www.scaler.in/activity-selection-problem/) - Interactive examples and implementations

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using the Activity Selection Algorithm, be mindful of these common challenges:

- **Incorrect Sorting:** Sorting by start time instead of finish time will not yield the optimal solution.

- **Overlooking Compatibility Check:** Failing to verify that the start time of the current activity is greater than or equal to the finish time of the previously selected activity.

- **Weighted Variant Confusion:** The standard algorithm doesn't work for the weighted version of the problem, which requires dynamic programming.

- **Edge Cases:** Not handling empty sets or single-activity sets correctly.
</details>
<details>
<summary>
### When and Where to Use Activity Selection
</summary>

The Activity Selection Algorithm is ideal in scenarios such as:

- Scheduling meetings in a single conference room.
- Allocating a resource that can only be used by one person at a time.
- Planning non-overlapping events or tasks.
- Managing time slots for a single processor or machine.

However, it may not be the best choice for:

- Problems where activities have different weights or values (use the weighted version instead).
- Scenarios where multiple resources are available simultaneously.
- Situations where partial overlaps are acceptable.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The Activity Selection Algorithm has numerous practical applications:

- **Meeting Room Scheduling:** Maximizing the number of meetings that can be held in a single room.

- **Resource Allocation:** Managing access to a shared resource that can only serve one user at a time.

- **CPU Job Scheduling:** Organizing tasks to maximize processor efficiency.

- **Event Planning:** Arranging the maximum number of events in a venue.

- **Transportation Logistics:** Scheduling deliveries or pickups to maximize efficiency.

- **Academic Course Scheduling:** Planning classes in a single classroom.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related algorithms extend the basic Activity Selection concept:

- **Weighted Activity Selection:** Assigns values to activities and aims to maximize total value, solved using dynamic programming in O(n log n) time.

- **Multi-threaded Activity Selection:** Extends the problem to multiple resources or processors.

- **Interval Scheduling Maximization Problem (ISMP):** Another name for the activity selection problem.

- **Interval Partitioning:** Minimizing the number of resources needed to schedule all activities.

- **Interval Coloring:** Assigning colors to intervals such that no overlapping intervals have the same color.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Activity Selection Problem represents one of the classic examples used to demonstrate the power of greedy algorithms. It has been a staple in algorithm textbooks and computer science education for decades. The problem's elegant solution showcases how sometimes making locally optimal choices can lead to a globally optimal solution, a principle that extends to many other optimization problems in computer science and operations research.

</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
Algorithm Greedy_Activity_Selector(s, f):
    // s[] is array of start times
    // f[] is array of finish times (already sorted)
    n = length(s)
    A = {1}    // Select first activity
    j = 1      // Last selected activity
    for i = 2 to n:
        if s[i] >= f[j]:
            A = A ∪ {i}    // Add activity i to result
            j = i          // Update last selected
    return A
```

For unsorted activities:

```
Algorithm Activity_Selection(activities):
    Sort activities by finish time
    return Greedy_Activity_Selector(activities.start, activities.finish)
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of the Activity Selection Algorithm can be proven using the greedy choice property and induction:

1. **Greedy Choice Property:** We can always include the activity with the earliest finish time in an optimal solution.
   - Proof: If we have an optimal solution that doesn't include the activity with the earliest finish time, we can replace any activity in that solution with the earliest-finishing activity and still have a valid solution with the same number of activities.

2. **Optimal Substructure:** After selecting the activity with the earliest finish time, the remaining problem is to find the maximum number of activities in the subset that start after the finish time of the first selected activity.
   - This creates a smaller instance of the same problem, which can be solved recursively.

By combining these properties, we can prove that the greedy algorithm always produces an optimal solution.
</details>