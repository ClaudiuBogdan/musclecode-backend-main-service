---
title: Understanding Articulation Points - The Problem
---

# 🔍 Articulation Points: Finding Critical Nodes in Networks

> [!NOTE]
> In this lesson, we'll explore what articulation points are and why they matter in graph theory and real-world applications.

## What Are Articulation Points? 🤔

Imagine a busy city with neighborhoods connected by bridges. If a particular bridge collapses, some neighborhoods might become completely isolated from others. In graph theory, we call such critical connection points **articulation points** (also known as cut vertices).

**Definition**: An articulation point is a vertex in an undirected graph which, when removed along with its associated edges, increases the number of connected components in the graph.

## Why Are They Important? 🌟

Articulation points represent vulnerabilities or critical junctures in networks:

- In computer networks, they might be routers whose failure would disconnect parts of the network
- In social networks, they could be individuals who bridge different communities
- In transportation systems, they might be crucial intersections or bridges
- In electrical circuits, they could be components whose failure would break the circuit

## Visual Example

```mermaid
graph TD;
    A---B;
    B---C;
    C---A;
    B---D;
    style B fill:#ff9999;
```

In this graph:
- Vertex B is an articulation point
- If B is removed, vertex D becomes disconnected from the rest of the graph
- Vertices A and C form a cycle, so neither is an articulation point

## The Challenge 🎯

**Given an undirected graph, find all articulation points.**

### Example 1:
```
Input: Graph with edges [(0,1), (1,2), (2,0), (1,3)]
Output: [1]
```
*Explanation: Removing vertex 1 disconnects vertex 3 from the rest of the graph.*

### Example 2:
```
Input: Graph with edges [(0,1), (1,2), (2,3), (3,0)]
Output: []
```
*Explanation: The graph forms a cycle, and removing any single vertex doesn't disconnect the graph.*

> [!TIP]
> Before diving into the algorithm, try to identify articulation points in simple graphs by hand. This will help build your intuition!

## Think About It 🧠

<details>
<summary>What makes a vertex an articulation point?</summary>

A vertex is an articulation point if removing it (and its incident edges) increases the number of connected components in the graph. This happens when the vertex serves as the only connection between different parts of the graph.
</details>

<details>
<summary>Can a leaf node (degree 1) be an articulation point?</summary>

No, a leaf node cannot be an articulation point. Removing a leaf node doesn't disconnect any other parts of the graph since it's only connected to one other vertex.
</details>

In the next lesson, we'll explore the key concepts needed to efficiently find articulation points! 