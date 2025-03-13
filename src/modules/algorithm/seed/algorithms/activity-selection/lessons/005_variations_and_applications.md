---
title: Variations and Real-World Applications
---

# 🌐 Beyond the Basic Algorithm

So far, we've learned about the standard activity selection problem and how to solve it efficiently. But what makes this algorithm truly powerful is its adaptability to various real-world scenarios and its connection to other algorithmic problems.

## 🔄 Variations of the Activity Selection Problem

### 1. ⚖️ Weighted Activity Selection Problem

What if each activity has a value or weight, and we want to maximize the total value rather than the number of activities?

```
Activity | Start | End | Value
---------|-------|-----|------
A        | 1     | 3   | 5
B        | 2     | 5   | 10
C        | 4     | 6   | 5
D        | 6     | 7   | 8
E        | 5     | 8   | 15
```

In this case, the greedy approach doesn't work! We need dynamic programming to solve this variation, with a time complexity of O(n log n).

### 2. 👥 Multiple Resource Activity Selection

What if we have multiple resources (like rooms or people) available and want to schedule activities optimally?

This is related to the "Interval Partitioning Problem" and can be solved by:
1. Sorting activities by start time
2. Using a greedy approach with priority queues to assign resources

### 3. 🧩 Overlapping Activities with Constraints

Sometimes we allow partial overlaps or have additional constraints. For example:
- Activities can overlap if they're in different locations
- Some activities must happen before others
- There are setup or teardown times between activities

These variations often require customized algorithms combining greedy methods with other techniques.

## 🏭 Real-World Applications

Let's explore some practical applications of the activity selection algorithm and its variations:

### 1. 📅 Meeting Room Scheduling

**Problem**: Schedule the maximum number of meetings in a single conference room.

**Solution**: Apply the basic activity selection algorithm, sorting meetings by end time.

Example implementation in a room booking system:
```typescript
function scheduleMaxMeetings(meetings: Meeting[]): Meeting[] {
  // Sort meetings by end time
  meetings.sort((a, b) => a.endTime - b.endTime);
  
  const scheduledMeetings: Meeting[] = [meetings[0]];
  let lastMeeting = meetings[0];
  
  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i].startTime >= lastMeeting.endTime) {
      scheduledMeetings.push(meetings[i]);
      lastMeeting = meetings[i];
    }
  }
  
  return scheduledMeetings;
}
```

### 2. 🚢 Task Scheduling in Operating Systems

**Problem**: Schedule CPU tasks to maximize throughput.

**Solution**: Model tasks as activities with execution times, then use activity selection to maximize the number of completed tasks.

### 3. 🎓 Course Scheduling

**Problem**: Help students select the maximum number of non-overlapping courses.

**Solution**: Apply activity selection, with courses as activities and class times as intervals.

### 4. 📺 Advertisement Slot Allocation

**Problem**: Schedule the maximum number of ads in a limited broadcast window.

**Solution**: Use activity selection to maximize ad placements without overlaps.

## 🔗 Connection to Other Algorithmic Problems

The activity selection problem is related to several other important problems in computer science:

### 1. ⏰ Interval Scheduling and Partitioning

**Connection**: Activity selection is a type of interval scheduling problem.

**Extension**: Interval partitioning focuses on finding the minimum number of resources needed to schedule all activities.

### 2. 🎨 Graph Coloring

**Connection**: The problem of coloring intervals so that no overlapping intervals have the same color is related to activity selection.

**Application**: Useful for frequency assignment in wireless networks.

### 3. 🧮 Dynamic Programming

**Connection**: The weighted activity selection problem is solved using dynamic programming.

## 🤔 Thinking Deeper: Optimality Proof

Why does selecting activities by earliest finish time guarantee an optimal solution? Here's an intuitive proof:

1. Let's say we have an optimal solution S that doesn't include the activity with the earliest finish time (call it A).
2. We can replace any activity in S with A without decreasing the total number of activities.
3. Therefore, there exists an optimal solution that includes A.
4. After selecting A, we can recursively apply the same logic to the remaining compatible activities.

This is an example of the "greedy choice property" and "optimal substructure" that make greedy algorithms work.

## 🧠 Challenge Question

Consider this scenario: You have activities with start times, end times, and profits. You have two people available to perform activities. How would you maximize the total profit?

In the next lesson, we'll examine practical implementation tips and common pitfalls when coding the activity selection algorithm. 