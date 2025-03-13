---
title: Understanding the Hamiltonian Path Problem
---

# 🧩 The Hamiltonian Path Problem

> [!NOTE]
> A Hamiltonian Path is a path in a graph that visits each vertex exactly once. Think of it as visiting every city on a map without revisiting any city!

## 🔍 What is a Hamiltonian Path?

Imagine you're planning a road trip across multiple cities, and you want to visit each city exactly once. This is essentially the Hamiltonian Path problem! In graph theory terms:

- You have a **graph** with **vertices** (cities) and **edges** (roads connecting the cities)
- Your goal is to find a path that visits each vertex exactly once
- If such a path exists, the graph is said to have a Hamiltonian Path

![Hamiltonian Path Example](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Hamiltonian_path.svg/320px-Hamiltonian_path.svg.png)

## 🌟 Real-World Applications

Hamiltonian Paths have numerous practical applications:
- **Route planning** for delivery services
- **Circuit design** in electronics
- **DNA fragment assembly** in bioinformatics
- **Game puzzles** like the Knight's Tour on a chessboard

## 🤔 Why is it Challenging?

> [!TIP]
> The Hamiltonian Path problem is NP-complete, which means it gets exponentially harder as the graph grows larger!

Unlike many other graph problems, there's no simple rule to determine if a Hamiltonian Path exists without searching for one. This makes it computationally intensive for large graphs.

## 📊 Example

Consider this simple graph with 5 vertices (A, B, C, D, E) and these edges:
- A connects to B and C
- B connects to A, C, and D
- C connects to A, B, D, and E
- D connects to B, C, and E
- E connects to C and D

<details>
<summary>Can you find a Hamiltonian Path in this graph?</summary>

One possible Hamiltonian Path is: **A → B → D → C → E**

This path visits each vertex exactly once!
</details>

In the next lessons, we'll explore how to systematically approach this problem and implement solutions using different techniques!

## 🧠 Think About It

Before moving on, consider:
1. Is a Hamiltonian Path always possible in any graph? Why or why not?
2. What's the difference between a Hamiltonian Path and a Hamiltonian Cycle?
3. How many different Hamiltonian Paths could exist in a complete graph with n vertices? 