---
title: Implementation Tips and Common Pitfalls
---

# 💻 Practical Implementation

Now that we understand the theory behind the activity selection algorithm, let's focus on practical implementation tips and common pitfalls to avoid when coding the solution.

## 🛠️ Implementation Tips

### 1. ✅ Handle Edge Cases

Always check for edge cases in your implementation:

```typescript
function activitySelection(activities: Activity[]): Activity[] {
  // Edge case: empty input
  if (!activities || activities.length === 0) {
    return [];
  }
  
  // Edge case: single activity
  if (activities.length === 1) {
    return [activities[0]];
  }
  
  // Main algorithm implementation...
}
```

### 2. 🔄 Stable Sorting

When multiple activities have the same finish time, the choice between them could affect the result:

```typescript
// Unstable sort (might give different results for equal finish times)
activities.sort((a, b) => a.end - b.end);

// More stable approach: sort by end time first, then by start time
activities.sort((a, b) => {
  if (a.end !== b.end) {
    return a.end - b.end;
  }
  return a.start - b.start; // Secondary sort by start time
});
```

### 3. 🧹 Don't Modify Input

Unless specified, it's generally good practice not to modify the input array:

```typescript
// Bad: Sorts the original array
function activitySelection(activities: Activity[]): Activity[] {
  activities.sort((a, b) => a.end - b.end);
  // ...
}

// Better: Works with a copy of the array
function activitySelection(activities: Activity[]): Activity[] {
  const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
  // ...
}
```

### 4. 🏷️ Add Meaningful Comments

Document your code, especially for complex algorithms:

```typescript
/**
 * Selects the maximum number of non-overlapping activities
 * using the greedy activity selection algorithm.
 * 
 * Time Complexity: O(n log n) where n is the number of activities
 * Space Complexity: O(n) for storing the result
 * 
 * @param activities Array of activities with start and end times
 * @returns Array of selected non-overlapping activities
 */
function activitySelection(activities: Activity[]): Activity[] {
  // Implementation...
}
```

### 5. 📊 Pre-processing for Better Performance

In some real-world scenarios, you might want to add pre-processing steps:

```typescript
function activitySelection(activities: Activity[]): Activity[] {
  // Filter out invalid activities
  const validActivities = activities.filter(a => a.start < a.end);
  
  // Rest of the implementation...
}
```

## 🚨 Common Pitfalls

### 1. ❌ Sorting by Start Time Instead of End Time

```typescript
// WRONG: Sorting by start time
activities.sort((a, b) => a.start - b.start);

// CORRECT: Sort by end time
activities.sort((a, b) => a.end - b.end);
```

### 2. ❌ Incorrect Comparison for Non-overlapping

```typescript
// WRONG: Activities overlap if one starts exactly when the other ends
if (activities[i].start > lastSelected.end) {
  // ...
}

// CORRECT: Activities are compatible if one starts at or after the other ends
if (activities[i].start >= lastSelected.end) {
  // ...
}
```

### 3. ❌ Forgetting to Handle Empty Input

```typescript
// WRONG: Will crash on empty input
const selectedActivities = [activities[0]];

// CORRECT: Check for empty input
if (activities.length === 0) {
  return [];
}
const selectedActivities = [activities[0]];
```

### 4. ❌ Using the Wrong Algorithm for Weighted Problems

```typescript
// WRONG: Using greedy approach for weighted activity selection
function weightedActivitySelection(activities: WeightedActivity[]): WeightedActivity[] {
  activities.sort((a, b) => a.end - b.end);
  // This won't give optimal results for weighted problems!
}

// CORRECT: Use dynamic programming for weighted activity selection
function weightedActivitySelection(activities: WeightedActivity[]): WeightedActivity[] {
  // Dynamic programming implementation...
}
```

### 5. ❌ Inefficient Implementation of the Recursive Approach

```typescript
// INEFFICIENT: May process the same subproblems multiple times
function recursiveSelection(activities, i) {
  // Implementation without memoization...
}

// BETTER: Use memoization to avoid redundant work
function recursiveSelection(activities, i, memo = {}) {
  if (i in memo) return memo[i];
  // Implementation with memoization...
  memo[i] = result;
  return result;
}
```

## 🧪 Testing Your Implementation

Always test your implementation with various scenarios:

1. **Empty input**: Should return an empty array
2. **Single activity**: Should return that activity
3. **No compatible activities**: Should select the first activity only
4. **All compatible activities**: Should select all activities
5. **Mixed case**: Should select the optimal subset
6. **Activities with identical finish times**: Should still find an optimal solution

```typescript
// Example test cases
const tests = [
  { name: "Empty input", input: [], expected: [] },
  { name: "Single activity", input: [{start: 1, end: 3}], expected: [{start: 1, end: 3}] },
  // More test cases...
];

tests.forEach(test => {
  const result = activitySelection(test.input);
  console.log(`${test.name}: ${JSON.stringify(result) === JSON.stringify(test.expected) ? "PASS" : "FAIL"}`);
});
```

## 💡 Language-Specific Tips

### JavaScript/TypeScript
```typescript
// Use built-in array methods
const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
const result = [sortedActivities[0]];
let lastEnd = sortedActivities[0].end;

sortedActivities.slice(1).forEach(activity => {
  if (activity.start >= lastEnd) {
    result.push(activity);
    lastEnd = activity.end;
  }
});
```

### Python
```python
def activity_selection(activities):
    if not activities:
        return []
    
    # Sort by finish time
    activities.sort(key=lambda x: x['end'])
    
    selected = [activities[0]]
    last_end = activities[0]['end']
    
    for activity in activities[1:]:
        if activity['start'] >= last_end:
            selected.append(activity)
            last_end = activity['end']
    
    return selected
```

In the next and final lesson, we'll summarize what we've learned and explore how this algorithm can be a stepping stone to solving more complex scheduling problems. 