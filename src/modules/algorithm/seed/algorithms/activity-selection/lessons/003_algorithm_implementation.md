---
title: Step-by-Step Algorithm Implementation
---

# 📝 Implementing the Algorithm

Now that we understand the greedy approach for the activity selection problem, let's develop a step-by-step algorithm to implement it.

## 🧮 The Algorithm - Iterative Approach

Here's a clear, step-by-step implementation of the activity selection algorithm:

1. **Sort the activities by finish time** (earliest finish time first)
2. **Select the first activity** (the one that finishes earliest)
3. **Iterate through the remaining activities**:
   - If the current activity starts after or at the same time as the finish time of the last selected activity, select it
   - Update the last selected activity

## 💻 Pseudocode

```
function ActivitySelection(activities):
    if activities is empty:
        return empty list
    
    // Sort activities by finish time
    sort activities by their finish time
    
    // Select first activity
    selectedActivities = [activities[0]]
    lastSelected = activities[0]
    
    // Process remaining activities
    for i = 1 to length(activities)-1:
        if activities[i].start >= lastSelected.end:
            add activities[i] to selectedActivities
            lastSelected = activities[i]
    
    return selectedActivities
```

## 🐞 Common Implementation Bugs

When coding this algorithm, watch out for these common mistakes:

### 1. Off-by-one Errors
```javascript
// Bug: Starting from index 0 instead of 1 when you've already selected the first activity
for (let i = 0; i < activities.length; i++) {
  // This will compare the first activity with itself
}

// Fixed: Start from index 1 if you've already selected activities[0]
for (let i = 1; i < activities.length; i++) {
  // Correct comparison
}
```

### 2. Incorrect Sorting
```javascript
// Bug: Sorting by start time
activities.sort((a, b) => a.start - b.start);

// Fixed: Sort by finish time
activities.sort((a, b) => a.end - b.end);
```

### 3. Forgetting Empty Input Check
```javascript
// Bug: Will crash on empty input
const selectedActivities = [activities[0]];

// Fixed: Check for empty input first
if (activities.length === 0) {
  return [];
}
const selectedActivities = [activities[0]];
```

### 4. Wrong Overlap Condition
```javascript
// Bug: Using strict inequality
if (activities[i].start > lastSelected.end) {
  // This won't select activities that start exactly when the last one ends
}

// Fixed: Use >= to include activities that start exactly when the last one ends
if (activities[i].start >= lastSelected.end) {
  // Correctly selects non-overlapping activities
}
```

## 🔄 Tracing the Algorithm

Let's trace through our example step by step:

Activity | Start | End
---------|-------|-----
A        | 9:00  | 10:30
B        | 9:30  | 10:30
C        | 10:00 | 11:00
D        | 11:00 | 12:00
E        | 10:30 | 12:30
F        | 12:30 | 13:30

**Step 1**: Sort by finish time (already sorted)

**Step 2**: Select activity A (finishes at 10:30)
- selectedActivities = [A]
- lastSelected = A (ends at 10:30)

**Step 3**: For each remaining activity:
- B: Starts at 9:30 < 10:30, so skip
- C: Starts at 10:00 < 10:30, so skip
- D: Starts at 11:00 ≥ 10:30, so select
  - selectedActivities = [A, D]
  - lastSelected = D (ends at 12:00)
- E: Starts at 10:30 < 12:00, so skip (note: even though E starts exactly when A finishes, we've already moved on to D)
- F: Starts at 12:30 ≥ 12:00, so select
  - selectedActivities = [A, D, F]
  - lastSelected = F (ends at 13:30)

**Result**: [A, D, F]

## 🧐 Visualization

Let's visualize this process:

![Activity Selection Algorithm Visualization](https://i.imgur.com/nLZKgXP.png)

The blue blocks represent selected activities, while the gray ones are skipped.

## 🔄 Alternative: Recursive Approach

The algorithm can also be implemented recursively:

```
function RecursiveActivitySelection(activities, n, k):
    // Base case: no more activities to consider
    if k >= n:
        return empty list
    
    // Initialize result with first activity
    result = [activities[k]]
    
    // Find the next activity whose start time is greater than
    // or equal to the finish time of activity k
    next = k + 1
    while next < n and activities[next].start < activities[k].end:
        next = next + 1
    
    // Recursive call
    return result + RecursiveActivitySelection(activities, n, next)
```

## 📊 Visualizing the Recursive Approach

Let's visualize how the recursive solution works:

```
                                   RecursiveActivitySelection(A,B,C,D,E,F, k=0)
                                                     |
                                                     | (Select A)
                                                     v
                                   RecursiveActivitySelection(A,B,C,D,E,F, k=3)
                                                     |
                                                     | (Select D)
                                                     v
                                   RecursiveActivitySelection(A,B,C,D,E,F, k=5)
                                                     |
                                                     | (Select F)
                                                     v
                                   RecursiveActivitySelection(A,B,C,D,E,F, k=6)
                                                     |
                                                     | (Base case: k >= n)
                                                     v
                                                  []
```

The recursion tree shows how the algorithm:
1. Selects activity A (index 0)
2. Finds the next compatible activity D (index 3)
3. Finds the next compatible activity F (index 5)
4. Reaches the base case when there are no more activities to consider
5. Builds the result [A, D, F] by combining selections as it unwinds the recursion

📌 **Note**: Both the iterative and recursive approaches give the same result, but the iterative approach is generally more efficient in terms of space complexity.

## 🤔 Think About It

What are the advantages and disadvantages of the iterative versus recursive approaches? Can you think of any scenarios where one might be preferable over the other?

In the next lesson, we'll analyze the algorithm's efficiency and discuss potential optimizations. 