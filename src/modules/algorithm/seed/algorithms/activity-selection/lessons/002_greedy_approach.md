---
title: The Greedy Approach to Activity Selection
---

# 🧠 The Greedy Approach

When faced with the activity selection problem, your first instinct might be to try various combinations of activities to find the optimal set. However, there's a much more efficient way to solve this problem using a **greedy algorithm**.

## 🤔 What is a Greedy Algorithm?

A greedy algorithm makes the locally optimal choice at each step, hoping that these choices will lead to a globally optimal solution. It's like climbing a mountain by always taking the steepest upward path, hoping to reach the summit.

> 💡 Greedy algorithms don't always lead to the globally optimal solution for all problems, but for the activity selection problem, they do!

## 🔍 Possible Greedy Strategies

Let's consider some potential greedy strategies for our problem:

1. **Select the activity with the earliest start time** ⏰
2. **Select the activity with the earliest finish time** 🏁
3. **Select the shortest activity (smallest duration)** ⌛
4. **Select the activity with the least conflicts** 🔄

Which of these do you think would work best? Let's analyze each option:

### Strategy 1: Earliest Start Time
If we always choose the activity that starts first, we might end up with a long activity that blocks many other potential activities.

### Strategy 2: Earliest Finish Time
By selecting the activity that finishes first, we free up the resource as early as possible, potentially allowing more activities to be scheduled afterward.

### Strategy 3: Shortest Duration
Choosing the shortest activities might seem intuitive, but it doesn't account for when these activities occur. A very short activity might still block several other activities if poorly timed.

### Strategy 4: Least Conflicts
This would require pre-computing conflicts for each activity, making the algorithm more complex.

## 🎯 The Winning Strategy: Earliest Finish Time

The optimal greedy strategy for the activity selection problem is to **always select the activity with the earliest finish time** from the remaining compatible activities.

![Greedy Activity Selection](https://i.imgur.com/XjJ5q2S.png)

## 🔄 Counter-Example: Why Other Strategies Fail

Let's see why other strategies don't work with a simple counter-example:

```
Activity | Start | End | Duration
---------|-------|-----|----------
A        | 1     | 10  | 9
B        | 2     | 3   | 1
C        | 3     | 4   | 1
D        | 4     | 5   | 1
```

Let's analyze the different strategies:

- **Earliest start time**: We would select A (starts at 1), which blocks all other activities. Total: 1 activity.
- **Shortest duration**: We could select B, C, and D (all duration 1). Total: 3 activities.
- **Earliest finish time**: We would select B (ends at 3), then C (ends at 4), then D (ends at 5). Total: 3 activities.

In this case, both shortest duration and earliest finish time work equally well. But consider this modified example:

```
Activity | Start | End | Duration
---------|-------|-----|----------
A        | 1     | 10  | 9
B        | 2     | 3   | 1
C        | 2     | 6   | 4
D        | 3     | 4   | 1
E        | 5     | 7   | 2
```

- **Shortest duration**: If we pick B (shortest), then D, then E. Total: 3 activities.
- **Earliest finish time**: We pick B (finishes first), then D, then E. Total: 3 activities.

Both still seem to work. But what about this one:

```
Activity | Start | End | Duration
---------|-------|-----|----------
A        | 1     | 3   | 2
B        | 2     | 3.5 | 1.5
C        | 3     | 4   | 1
D        | 3.5   | 5   | 1.5
E        | 4     | 5.5 | 1.5
```

- **Shortest duration**: B and D and E (all 1.5 units). Total: 3 activities.
- **Earliest finish time**: A, then C, then E. Total: 3 activities.

In complex scenarios, both strategies can arrive at different solutions, but earliest finish time is guaranteed to be optimal (we'll soon see why).

## 🧠 Why Earliest Finish Time Works: Intuitive Proof

Let's understand why selecting activities by earliest finish time always leads to an optimal solution:

1. **Suppose we have an optimal solution S** that doesn't include the activity with the earliest finish time (call it A).

2. **We can construct a new solution S'** by removing any activity from S and replacing it with A.

3. **S' is still a valid solution** because:
   - A finishes earlier than any other activity
   - So A cannot overlap with activities that start after it finishes
   - Therefore, S' has the same number of activities as S

4. **This means** we can always include the activity with the earliest finish time in an optimal solution without reducing the total number of activities.

5. **After selecting the first activity**, we're left with a smaller subproblem - finding the maximum activities starting after this first activity finishes.

6. **We can apply the same logic recursively** to this subproblem, always choosing the activity with the earliest finish time.

This demonstrates both the "greedy choice property" and the "optimal substructure" that make greedy algorithms work for this problem.

## 🧩 Let's Apply This to Our Example

Activity | Start Time | End Time
---------|------------|----------
A        | 9:00       | 10:30
B        | 9:30       | 10:30
C        | 10:00      | 11:00
D        | 11:00      | 12:00
E        | 10:30      | 12:30
F        | 12:30      | 13:30

First, we sort by finish time (already sorted in this case).
1. Select activity A (finishes at 10:30)
2. Next, choose the first activity that starts after A finishes: C (starts at 10:00, but we can't pick it because it overlaps with A)
3. Next option: D (starts at 11:00, after A finishes)
4. Finally, F (starts at 12:30, after D finishes)

So our selection is: A, D, F (3 activities in total)

💭 **Question**: What if activities A and B both finish at exactly the same time? Which one should we pick?

In the next lesson, we'll develop a step-by-step algorithm and analyze how it works in more detail. 