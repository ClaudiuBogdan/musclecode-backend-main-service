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

### Why does this work?

By choosing the activity that finishes earliest, we:
1. Maximize the remaining time for other activities
2. Leave as many options open as possible for the remaining time slots
3. Ensure we're not blocked by a long-running activity

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