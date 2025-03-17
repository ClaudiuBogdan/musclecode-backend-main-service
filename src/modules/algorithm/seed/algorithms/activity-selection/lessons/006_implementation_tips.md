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

### 6. 🔒 Robust Error Handling

Implement comprehensive error handling to make your code more robust:

```typescript
function activitySelection(activities: Activity[]): Activity[] {
  // Type checking
  if (!Array.isArray(activities)) {
    throw new TypeError('Input must be an array of activities');
  }
  
  // Validate activity objects
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    
    // Check if activity has required properties
    if (!activity || typeof activity !== 'object') {
      throw new TypeError(`Activity at index ${i} is not a valid object`);
    }
    
    // Check if start and end times are valid
    if (typeof activity.start !== 'number' || typeof activity.end !== 'number') {
      throw new TypeError(`Activity at index ${i} has invalid start/end times`);
    }
    
    // Check if start time is before end time
    if (activity.start > activity.end) {
      throw new Error(`Activity at index ${i} has start time after end time`);
    }
  }
  
  // Continue with algorithm implementation...
}
```

### 7. 🚀 Performance Optimizations

Optimize your implementation for better performance:

```typescript
function activitySelection(activities: Activity[]): Activity[] {
  // Early return for edge cases
  if (!activities || activities.length <= 1) {
    return activities || [];
  }

  // Check if already sorted (can save O(n log n) time)
  let isSorted = true;
  for (let i = 1; i < activities.length; i++) {
    if (activities[i-1].end > activities[i].end) {
      isSorted = false;
      break;
    }
  }
  
  // Only sort if necessary
  const sortedActivities = isSorted ? 
    activities : [...activities].sort((a, b) => a.end - b.end);
  
  // Use typed arrays for better performance in large datasets
  const result = new Array(activities.length);
  let resultSize = 1;
  result[0] = sortedActivities[0];
  
  let lastEnd = sortedActivities[0].end;
  
  // Avoid unnecessary function calls inside loop
  for (let i = 1; i < sortedActivities.length; i++) {
    const current = sortedActivities[i];
    if (current.start >= lastEnd) {
      result[resultSize++] = current;
      lastEnd = current.end;
    }
  }
  
  // Trim any unused array slots
  return result.slice(0, resultSize);
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

### 6. ❌ Incorrect Date/Time Handling

```typescript
// WRONG: Using Date objects directly in JavaScript without proper comparison
if (meeting1.endDate <= meeting2.startDate) {
  // This might fail due to time zones, milliseconds, etc.
}

// CORRECT: Convert to Unix timestamp for reliable comparison
if (meeting1.endDate.getTime() <= meeting2.startDate.getTime()) {
  // Reliable comparison of timestamps
}
```

### 7. ❌ Not Accounting for Floating Point Precision

```typescript
// WRONG: Direct comparison of floating point numbers
if (activity1.end === activity2.start) {
  // Might fail due to floating point precision
}

// CORRECT: Use a small epsilon for floating point comparisons
const EPSILON = 1e-9;
if (Math.abs(activity1.end - activity2.start) < EPSILON) {
  // More reliable for floating point values
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

## 🧮 Advanced: Binary Search for Finding Next Compatible Activity

When dealing with large datasets, you can use binary search to efficiently find the next compatible activity:

```typescript
function findNextCompatibleActivity(activities: Activity[], endTime: number, start: number): number {
  let low = start;
  let high = activities.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (activities[mid].start >= endTime) {
      // Found a compatible activity, but check if there's an earlier one
      if (mid === 0 || activities[mid-1].start < endTime) {
        return mid;
      }
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  
  return -1; // No compatible activity found
}

function optimizedActivitySelection(activities: Activity[]): Activity[] {
  // Sort activities by finish time
  const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
  
  const result = [];
  let lastSelectedIndex = -1;
  
  // Process activities efficiently
  for (let i = 0; i < sortedActivities.length; i++) {
    if (lastSelectedIndex === -1 || sortedActivities[i].start >= sortedActivities[lastSelectedIndex].end) {
      result.push(sortedActivities[i]);
      lastSelectedIndex = i;
    }
  }
  
  return result;
}
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

### Java
```java
public List<Activity> activitySelection(List<Activity> activities) {
    if (activities == null || activities.isEmpty()) {
        return new ArrayList<>();
    }
    
    // Sort by finish time
    activities.sort(Comparator.comparingInt(Activity::getEnd));
    
    List<Activity> selected = new ArrayList<>();
    selected.add(activities.get(0));
    int lastEnd = activities.get(0).getEnd();
    
    for (int i = 1; i < activities.size(); i++) {
        Activity current = activities.get(i);
        if (current.getStart() >= lastEnd) {
            selected.add(current);
            lastEnd = current.getEnd();
        }
    }
    
    return selected;
}
```

### Go
```go
func activitySelection(activities []Activity) []Activity {
    if len(activities) == 0 {
        return []Activity{}
    }
    
    // Sort by finish time
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].End < activities[j].End
    })
    
    selected := []Activity{activities[0]}
    lastEnd := activities[0].End
    
    for i := 1; i < len(activities); i++ {
        if activities[i].Start >= lastEnd {
            selected = append(selected, activities[i])
            lastEnd = activities[i].End
        }
    }
    
    return selected
}
```

In the next and final lesson, we'll summarize what we've learned and explore how this algorithm can be a stepping stone to solving more complex scheduling problems. 