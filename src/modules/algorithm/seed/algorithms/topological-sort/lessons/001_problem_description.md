---
title: Understanding the Problem - Topological Sort
---

# 🧩 Topological Sort: Arranging Tasks in Perfect Order

> [!NOTE]
> Topological Sort is a fundamental algorithm used to **linearly order** the vertices of a **directed acyclic graph** (DAG) in a way that respects all directed edges.

## 🔍 The Problem

Imagine you're planning a complex project with many tasks. Some tasks depend on others being completed first. How do you determine a valid sequence to complete all tasks without violating any dependencies?

This is exactly what topological sort solves!

## 🌟 Real-World Analogies

Think of these scenarios:

- 👨‍🎓 **Course Prerequisites**: You can't take Advanced Calculus before completing Basic Calculus.
- 🔨 **Construction Project**: You can't install windows before building walls.
- 👩‍💻 **Software Dependencies**: You can't run an application before installing its dependencies.
- 👨‍🍳 **Cooking**: You can't bake a cake before mixing the ingredients.

## 🎯 What We Need to Do

Given a directed acyclic graph (DAG):
- Each vertex represents a task
- Each edge (u → v) means task u must be completed before task v
- We need to find a linear ordering where all dependencies are respected

> [!WARNING]
> Topological sort only works on Directed Acyclic Graphs (DAGs). If there's a cycle in your graph, it's impossible to create a valid ordering!

## 💡 The Essence of Topological Sort

At its core, topological sort answers the question: "In what order should I perform these tasks so that I never work on a task before completing its prerequisites?"

<details>
<summary>Why is this called "Topological" Sort?</summary>

The name comes from the field of topology in mathematics. When we arrange vertices in an order that respects the structure (topology) of the graph, we're performing a "topological" ordering.
</details>

## 🤔 Critical Thinking Question

Before diving into the algorithm, think about this:

If task A depends on task B, and task B depends on task C, what's the correct order to complete these tasks? Try to visualize this as a graph!

> [!TIP]
> When working with topological sort, it helps to draw the graph on paper and trace through the algorithm manually.

In the next lesson, we'll explore how to represent a directed graph for our algorithm. 