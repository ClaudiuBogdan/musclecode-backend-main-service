---
title: Visualizing the Job Sequencing Algorithm
---

# 🎨 Visualizing the Job Sequencing Algorithm

Visualizing algorithms can significantly enhance our understanding of how they work. In this lesson, we'll use various visual representations to illustrate the Job Sequencing algorithm in action.

## The Problem Visualization 🖼️

Let's start with a visual representation of a job sequencing problem:

```mermaid
graph TD
    subgraph Available Jobs
        J1["Job 1<br>Profit: $70<br>Deadline: Day 3"]
        J2["Job 2<br>Profit: $30<br>Deadline: Day 1"]
        J3["Job 3<br>Profit: $60<br>Deadline: Day 2"]
        J4["Job 4<br>Profit: $40<br>Deadline: Day 1"]
    end
    
    subgraph Schedule Timeline
        D1[Day 1] --- D2[Day 2] --- D3[Day 3]
    end
    
    style J1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style J2 fill:#e8f4ea,stroke:#333,stroke-width:2px
    style J3 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style J4 fill:#fff7e6,stroke:#333,stroke-width:2px
```

Our task is to assign jobs to days to maximize total profit while respecting each job's deadline.

## Step-by-Step Visualization 🔄

Let's visualize how the algorithm processes this example step by step.

### Step 1: Sort Jobs by Profit (Highest to Lowest)

```mermaid
graph LR
    A["Unsorted Jobs"] --> B["Sort by<br>Profit"] --> C["Sorted Jobs"]
    
    subgraph Unsorted Jobs
        U1["Job 1: $70, Deadline 3"]
        U2["Job 2: $30, Deadline 1"]
        U3["Job 3: $60, Deadline 2"]
        U4["Job 4: $40, Deadline 1"]
    end
    
    subgraph Sorted Jobs
        S1["Job 1: $70, Deadline 3"]
        S3["Job 3: $60, Deadline 2"]
        S4["Job 4: $40, Deadline 1"]
        S2["Job 2: $30, Deadline 1"]
    end
    
    style S1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style S3 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style S4 fill:#fff7e6,stroke:#333,stroke-width:2px
    style S2 fill:#e8f4ea,stroke:#333,stroke-width:2px
```

### Step 2: Initialize Time Slots

We create an array to track which day each job is assigned to:

```mermaid
graph LR
    A["Time Slots"] --> B["Day 1<br>(Empty)"] --> C["Day 2<br>(Empty)"] --> D["Day 3<br>(Empty)"]
    
    style B fill:#f5f5f5,stroke:#333,stroke-width:2px
    style C fill:#f5f5f5,stroke:#333,stroke-width:2px
    style D fill:#f5f5f5,stroke:#333,stroke-width:2px
```

### Step 3: Process Each Job in Order

#### Processing Job 1 ($70, Deadline 3)

We try to assign Job 1 to the latest available slot before its deadline (Day 3):

```mermaid
graph TD
    A["Job 1<br>$70, Deadline 3"] --> B["Check Day 3"]
    B --> C["Day 3 Available!"]
    C --> D["Assign Job 1 to Day 3"]
    
    subgraph Current Schedule
        D1["Day 1<br>(Empty)"] --- D2["Day 2<br>(Empty)"] --- D3["Day 3<br>Job 1"]
    end
    
    style A fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D3 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Processing Job 3 ($60, Deadline 2)

Next, we try to assign Job 3 to the latest available slot before its deadline (Day 2):

```mermaid
graph TD
    A["Job 3<br>$60, Deadline 2"] --> B["Check Day 2"]
    B --> C["Day 2 Available!"]
    C --> D["Assign Job 3 to Day 2"]
    
    subgraph Current Schedule
        D1["Day 1<br>(Empty)"] --- D2["Day 2<br>Job 3"] --- D3["Day 3<br>Job 1"]
    end
    
    style A fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D3 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Processing Job 4 ($40, Deadline 1)

Now, we try to assign Job 4 to the latest available slot before its deadline (Day 1):

```mermaid
graph TD
    A["Job 4<br>$40, Deadline 1"] --> B["Check Day 1"]
    B --> C["Day 1 Available!"]
    C --> D["Assign Job 4 to Day 1"]
    
    subgraph Current Schedule
        D1["Day 1<br>Job 4"] --- D2["Day 2<br>Job 3"] --- D3["Day 3<br>Job 1"]
    end
    
    style A fill:#fff7e6,stroke:#333,stroke-width:2px
    style D1 fill:#fff7e6,stroke:#333,stroke-width:2px
    style D2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D3 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Processing Job 2 ($30, Deadline 1)

Finally, we try to assign Job 2, but there are no available slots before its deadline:

```mermaid
graph TD
    A["Job 2<br>$30, Deadline 1"] --> B["Check Day 1"]
    B --> C["Day 1 Not Available"]
    C --> D["Skip Job 2"]
    
    subgraph Final Schedule
        D1["Day 1<br>Job 4"] --- D2["Day 2<br>Job 3"] --- D3["Day 3<br>Job 1"]
    end
    
    style A fill:#e8f4ea,stroke:#333,stroke-width:2px
    style D fill:#ffe6e6,stroke:#333,stroke-width:2px
    style D1 fill:#fff7e6,stroke:#333,stroke-width:2px
    style D2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D3 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

### Final Result

The final schedule includes Jobs 1, 3, and 4, with a total profit of $70 + $60 + $40 = $170.

## The "Latest Available Slot" Strategy 🎯

One key aspect of the algorithm is choosing the latest available slot before a job's deadline. Let's visualize why this is important:

<details>
<summary>Why choose the latest available slot?</summary>

Consider two different strategies for the same jobs:

### Strategy 1: Earliest Available Slot

```mermaid
graph TD
    subgraph "Strategy 1: Earliest Slot"
        E1["Job 1 ($70)<br>→ Day 1"] --- E2["Job 3 ($60)<br>→ Cannot Schedule"] --- E3["Day 3<br>Empty"]
    end
    
    style E1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style E2 fill:#ffe6e6,stroke:#333,stroke-width:2px
    style E3 fill:#f5f5f5,stroke:#333,stroke-width:2px
```

**Total Profit: $70**

### Strategy 2: Latest Available Slot

```mermaid
graph TD
    subgraph "Strategy 2: Latest Slot"
        L1["Day 1<br>Empty"] --- L2["Job 3 ($60)<br>→ Day 2"] --- L3["Job 1 ($70)<br>→ Day 3"]
    end
    
    style L1 fill:#f5f5f5,stroke:#333,stroke-width:2px
    style L2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style L3 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

**Total Profit: $130**

By choosing the latest available slot, we keep earlier slots free for jobs with tighter deadlines, potentially increasing the total number of jobs we can schedule and the overall profit.
</details>

## Tracing Through a Complex Example 🧩

Let's visualize a more complex example to deepen our understanding:

```
Jobs:
A: Profit = $100, Deadline = Day 2
B: Profit = $80, Deadline = Day 1
C: Profit = $60, Deadline = Day 2
D: Profit = $50, Deadline = Day 3
E: Profit = $30, Deadline = Day 1
```

<details open>
<summary>Click to see the step-by-step visualization</summary>

### 1. Sort Jobs by Profit
```mermaid
graph LR
    subgraph "Sorted Jobs (by Profit)"
        S1["Job A: $100, Deadline 2"]
        S2["Job B: $80, Deadline 1"]
        S3["Job C: $60, Deadline 2"]
        S4["Job D: $50, Deadline 3"]
        S5["Job E: $30, Deadline 1"]
    end
    
    style S1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style S2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style S3 fill:#e8f4ea,stroke:#333,stroke-width:2px
    style S4 fill:#fff7e6,stroke:#333,stroke-width:2px
    style S5 fill:#f5f5f5,stroke:#333,stroke-width:2px
```

### 2. Process Each Job

#### Job A ($100, Deadline 2)
```mermaid
graph TD
    A["Job A<br>$100, Deadline 2"] --> B["Check Day 2"]
    B --> C["Day 2 Available!"]
    C --> D["Assign Job A to Day 2"]
    
    subgraph Current Schedule
        D1["Day 1<br>(Empty)"] --- D2["Day 2<br>Job A"] --- D3["Day 3<br>(Empty)"]
    end
    
    style A fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D2 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Job B ($80, Deadline 1)
```mermaid
graph TD
    A["Job B<br>$80, Deadline 1"] --> B["Check Day 1"]
    B --> C["Day 1 Available!"]
    C --> D["Assign Job B to Day 1"]
    
    subgraph Current Schedule
        D1["Day 1<br>Job B"] --- D2["Day 2<br>Job A"] --- D3["Day 3<br>(Empty)"]
    end
    
    style A fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D1 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Job C ($60, Deadline 2)
```mermaid
graph TD
    A["Job C<br>$60, Deadline 2"] --> B["Check Day 2"]
    B --> C["Day 2 Not Available"]
    C --> D["Check Day 1"]
    D --> E["Day 1 Not Available"]
    E --> F["Skip Job C"]
    
    subgraph Current Schedule
        D1["Day 1<br>Job B"] --- D2["Day 2<br>Job A"] --- D3["Day 3<br>(Empty)"]
    end
    
    style A fill:#e8f4ea,stroke:#333,stroke-width:2px
    style F fill:#ffe6e6,stroke:#333,stroke-width:2px
    style D1 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#f9d5e5,stroke:#333,stroke-width:2px
```

#### Job D ($50, Deadline 3)
```mermaid
graph TD
    A["Job D<br>$50, Deadline 3"] --> B["Check Day 3"]
    B --> C["Day 3 Available!"]
    C --> D["Assign Job D to Day 3"]
    
    subgraph Current Schedule
        D1["Day 1<br>Job B"] --- D2["Day 2<br>Job A"] --- D3["Day 3<br>Job D"]
    end
    
    style A fill:#fff7e6,stroke:#333,stroke-width:2px
    style D1 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D3 fill:#fff7e6,stroke:#333,stroke-width:2px
```

#### Job E ($30, Deadline 1)
```mermaid
graph TD
    A["Job E<br>$30, Deadline 1"] --> B["Check Day 1"]
    B --> C["Day 1 Not Available"]
    C --> D["Skip Job E"]
    
    subgraph Final Schedule
        D1["Day 1<br>Job B"] --- D2["Day 2<br>Job A"] --- D3["Day 3<br>Job D"]
    end
    
    style A fill:#f5f5f5,stroke:#333,stroke-width:2px
    style D fill:#ffe6e6,stroke:#333,stroke-width:2px
    style D1 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D3 fill:#fff7e6,stroke:#333,stroke-width:2px
```

### 3. Final Result

The final schedule includes Jobs A, B, and D, with a total profit of $100 + $80 + $50 = $230.
</details>

## Visualizing Edge Cases 🔍

### 1. All Jobs Have the Same Deadline

```mermaid
graph TD
    subgraph "Jobs with Same Deadline"
        J1["Job 1: $50, Deadline 1"]
        J2["Job 2: $40, Deadline 1"]
        J3["Job 3: $30, Deadline 1"]
        J4["Job 4: $20, Deadline 1"]
    end
    
    subgraph "Final Schedule"
        D1["Day 1<br>Job 1"]
    end
    
    J1 --> D1
    J2 -.-> X2["Skipped"]
    J3 -.-> X3["Skipped"]
    J4 -.-> X4["Skipped"]
    
    style J1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style X2 fill:#ffe6e6,stroke:#333,stroke-width:2px
    style X3 fill:#ffe6e6,stroke:#333,stroke-width:2px
    style X4 fill:#ffe6e6,stroke:#333,stroke-width:2px
```

In this case, only the highest profit job (Job 1) can be scheduled, and the rest must be skipped.

### 2. No Overlapping Deadlines

```mermaid
graph TD
    subgraph "Jobs with Unique Deadlines"
        J1["Job 1: $70, Deadline 3"]
        J2["Job 2: $50, Deadline 1"]
        J3["Job 3: $40, Deadline 2"]
        J4["Job 4: $30, Deadline 4"]
    end
    
    subgraph "Final Schedule"
        D1["Day 1<br>Job 2"] --- D2["Day 2<br>Job 3"] --- D3["Day 3<br>Job 1"] --- D4["Day 4<br>Job 4"]
    end
    
    J1 --> D3
    J2 --> D1
    J3 --> D2
    J4 --> D4
    
    style J1 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style J2 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style J3 fill:#e8f4ea,stroke:#333,stroke-width:2px
    style J4 fill:#fff7e6,stroke:#333,stroke-width:2px
    
    style D1 fill:#d4f1f9,stroke:#333,stroke-width:2px
    style D2 fill:#e8f4ea,stroke:#333,stroke-width:2px
    style D3 fill:#f9d5e5,stroke:#333,stroke-width:2px
    style D4 fill:#fff7e6,stroke:#333,stroke-width:2px
```

When there are no overlapping deadlines, all jobs can be scheduled.

## Interactive Exploration ✨

> [!TIP]
> To deepen your understanding, try tracing through the algorithm yourself with different sets of jobs. Pay attention to how the schedule changes as you modify job profits or deadlines.

Try this example:
```
Jobs:
- Job X: Profit = $80, Deadline = Day 2
- Job Y: Profit = $70, Deadline = Day 2
- Job Z: Profit = $60, Deadline = Day 1
```

<details>
<summary>What is the optimal schedule?</summary>

The optimal schedule is:
- Day 1: Job Z ($60)
- Day 2: Job X ($80)

Total profit: $140

This example shows how the greedy approach prioritizes the highest profit jobs and assigns them to the latest possible slots.
</details>

## Reflection Questions ✨

1. How does the visualization help you understand the importance of the "latest available slot" strategy?

2. Can you think of a scenario where visualizing the algorithm reveals an insight that might not be obvious from just reading the code?

3. How would you visualize the improved version of the algorithm that uses a disjoint set data structure?

In the next lesson, we'll discuss common pitfalls when implementing the Job Sequencing algorithm and provide tips to avoid them. 