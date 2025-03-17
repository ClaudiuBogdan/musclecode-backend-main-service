---
title: Understanding the Activity Selection Problem
---

# 🎯 The Activity Selection Problem

Imagine you're planning your day and have a list of activities you'd like to do. Each activity has a specific start time and end time. Unfortunately, some activities overlap, and you can only do one thing at a time! 

**How do you select the maximum number of activities you can complete?** 🤔

## 🌟 Real-World Examples

This problem appears in many everyday scenarios:
- 📅 Scheduling meetings in a conference room
- 🏫 Planning classes in a classroom
- 🎬 Booking movie sessions in a theater
- 💻 Allocating processor time for various tasks

## 📊 Visual Representation

Let's visualize the problem to make it more intuitive:

```
       A: |-------|
    B:    |-------|
  C:        |--|
      D:         |-------|
    E:            |-----------|
       F:                |---|
       
       9   10   11   12   13   14
       |    |    |    |    |    |
      Time →
```

In this timeline, each bar represents an activity with its start and end time. You can see some activities overlap, making it impossible to do all of them.

## 📝 Problem Definition

Given:
- A set of activities, each with a start time and finish time
- A single resource that can only be used by one activity at a time

Goal:
- Select the **maximum number** of non-overlapping activities

> ⚠️ Important: We're trying to maximize the **number of activities**, not the total time used or any other measure.

## 🧩 Example

Let's look at a simple example:

Activity | Start Time | End Time
---------|------------|----------
A        | 9:00       | 10:30
B        | 9:30       | 10:30
C        | 10:00      | 11:00
D        | 11:00      | 12:00
E        | 10:30      | 12:30
F        | 12:30      | 13:30

Which activities would you choose to maximize the number you can complete? Take a moment to think about it...

## 🤔 Try It Yourself

Before moving on, try to solve this simple version of the problem:

Activity | Start Time | End Time
---------|------------|----------
P        | 1:00       | 3:00
Q        | 2:00       | 4:00
R        | 3:00       | 5:00
S        | 4:00       | 6:00

Which activities would you select? Think about what strategy you're using to make your choices.

<details>
<summary>See Answer</summary>

The optimal selection is activities P and R, for a total of 2 activities.

Did you try a specific strategy? In the next lesson, we'll explore different approaches to solving this problem efficiently.
</details>

💡 **Question to consider**: Is there a simple strategy we could use to approach this problem efficiently?

In the next lesson, we'll explore how to think about this problem and develop an intuitive approach to solving it. 