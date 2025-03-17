---
title: Interactive Visualization of Activity Selection
---

# 👁️ Visualizing Activity Selection

Understanding the activity selection algorithm becomes much easier when you can see it in action. This lesson focuses on visual representations to help build intuition about how the algorithm works.

## 📊 Timeline Representation

Activities can be visualized as segments on a timeline, making it easy to spot overlaps and understand the selection process:

```
Initial Activities:
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

When we apply the activity selection algorithm (selecting by earliest finish time), we get:

```
Selected Activities:
       A: |=======|
  C:        |-X-|    (overlaps with A)
      D:         |=======|
    E:            |----X----| (overlaps with D)
       F:                |=======|
       
       9   10   11   12   13   14
       |    |    |    |    |    |
      Time →
```

Where:
- `|=======|` represents selected activities
- `|---X---|` represents activities that weren't selected due to conflicts

## 🎬 Step-by-Step Visualization

Let's watch the algorithm run step by step on our example:

### Step 1: Sort activities by finish time

```
  C:        |--|      (ends at 11:00)
       A: |-------|   (ends at 10:30)
    B:    |-------|   (ends at 10:30)
      D:         |-------|  (ends at 12:00)
       F:                |---|  (ends at 13:30)
    E:            |-----------|  (ends at 12:30)
       
       9   10   11   12   13   14
```

Note: A and B have the same finish time. For stability, let's keep their original order (A before B).

### Step 2: Select the first activity (A)

```
       A: |=======|   (Selected)
    B:    |-------|
  C:        |--|
      D:         |-------|
    E:            |-----------|
       F:                |---|
```

### Step 3: Skip activities that conflict with A

```
       A: |=======|   (Selected)
    B:    |---X---|   (Conflicts with A)
  C:        |-X-|     (Conflicts with A)
      D:         |-------|
    E:            |-----------|
       F:                |---|
```

### Step 4: Select the next compatible activity (D)

```
       A: |=======|   (Selected)
    B:    |---X---|   (Conflicts with A)
  C:        |-X-|     (Conflicts with A)
      D:         |=======|  (Selected)
    E:            |----X----| (Conflicts with D)
       F:                |---|
```

### Step 5: Select the next compatible activity (F)

```
       A: |=======|   (Selected)
    B:    |---X---|   (Conflicts with A)
  C:        |-X-|     (Conflicts with A)
      D:         |=======|  (Selected)
    E:            |----X----| (Conflicts with D)
       F:                |=======| (Selected)
```

### Final result: Activities A, D, and F are selected

## 🌳 Decision Tree Visualization

The selection process can also be viewed as a decision tree:

```
                              Start
                                |
                                v
                    Select A (earliest finish)
                       /             \
                      /               \
                 Include A           Skip A
                    /                   \
                   /                     \
    Next compatible: D                Next: B
                 /    \                /    \
                /      \              /      \
         Include D    Skip D    Include B    Skip B
            /           \          /           \
           /             \        /             \
 Next: F           Next: E    Next: C        Next: C
     /   \             /  \      /  \          /  \
    /     \           /    \    /    \        /    \
 Inc F   Skip F   Inc E  Skip E ... and so on ...
  
Result: 3 activities      Result: 2 activities    Result: ...   
(A,D,F)                   (A,E)                   (depends on further choices)
```

This tree shows how different choices lead to different total activities. The greedy approach follows the left branch at each level, always including the compatible activity with the earliest finish time.

## 🔄 Interactive Animation

Imagine an animation where:
1. Activities slide in from the left in their original order
2. They rearrange themselves as they're sorted by finish time
3. The first activity (earliest finish time) gets highlighted and selected
4. Conflicting activities fade out
5. The next compatible activity gets highlighted and selected
6. The process repeats until all activities are either selected or eliminated

This dynamic visualization helps understand how the algorithm progresses through the activity list.

## 🧪 Try It Yourself: Interactive Practice

Here's a new set of activities to practice with:

```
Activity | Start | End
---------|-------|-----
P        | 1:00  | 4:30
Q        | 2:00  | 3:00
R        | 3:30  | 5:00
S        | 4:00  | 6:00
T        | 5:30  | 7:00
U        | 6:30  | 8:00
```

Try walking through the algorithm steps on your own:
1. Sort the activities by finish time
2. Select the first activity
3. Find the next compatible activity
4. Repeat until no more activities can be selected

<details>
<summary>See Solution</summary>

Step 1: Sort by finish time
- Q (2:00-3:00)
- P (1:00-4:30)
- R (3:30-5:00)
- S (4:00-6:00)
- T (5:30-7:00)
- U (6:30-8:00)

Step 2: Select Q (ends earliest at 3:00)

Step 3: Find next compatible activity after Q ends
- R (starts at 3:30, which is after Q ends at 3:00) - Select R

Step 4: Find next compatible activity after R ends
- T (starts at 5:30, which is after R ends at 5:00) - Select T

Step 5: Find next compatible activity after T ends
- U (starts at 6:30, which is after T ends at 7:00) - Cannot select U

Final selection: Q, R, T (3 activities)
</details>

## 📊 Visual Proof of Optimality

We can visually demonstrate why selecting by earliest finish time is optimal:

```
If we select activity P instead of Q initially:
      P: |===============|
      Q:    |-X-|           (conflicts with P)
      R:          |--X-|    (conflicts with P)
      S:            |-------|
      T:                  |-----|
      U:                       |-----|

Result: P, S, U (3 activities)
```

```
If we follow the greedy approach (select by earliest finish time):
      P:  |---X---|           (not selected first)
      Q:    |=====|           (selected first)
      R:          |=====|     (selected second)
      S:            |--X--|   (conflicts with R)
      T:                  |=====|  (selected third)
      U:                       |--X--|  (conflicts with T)

Result: Q, R, T (3 activities)
```

Both approaches yield 3 activities in this case, but the greedy approach (earliest finish time) is guaranteed to be optimal in all cases.

## 🧠 Thinking Exercise

Visualize how the weighted activity selection problem requires a different approach:

```
Activity | Start | End | Value
---------|-------|-----|-------
A        | 1     | 3   | 5
B        | 2     | 5   | 10
C        | 4     | 6   | 5
D        | 5     | 8   | 15
E        | 7     | 9   | 8
```

<details>
<summary>Why doesn't greedy work here?</summary>

If we use the greedy approach (earliest finish time):
- We would select A, C, E for a total value of 5 + 5 + 8 = 18

But the optimal solution is:
- Select B, D for a total value of 10 + 15 = 25

This demonstrates why we need dynamic programming for the weighted version of the problem.
</details>

## 🔄 From Visualization to Implementation

These visual models can help you understand how to implement the algorithm:

1. The timeline representation shows why we need to sort by finish time
2. The step-by-step visualization clarifies the selection process
3. The decision tree explains why greedy works for this problem
4. The visual proof helps understand optimality

In the next lesson, we'll analyze the algorithm's efficiency and explore optimizations based on these visual insights. 