---
title: Understanding the LRU Cache Problem
---

# 🧩 Understanding the LRU Cache Problem

## What is an LRU Cache? 🤔

A Least Recently Used (LRU) Cache is a specialized data structure designed to store a limited number of items while automatically discarding the least recently accessed items when the capacity is reached. Think of it as a smart bookshelf that can only hold a certain number of books - when you need to add a new book but the shelf is full, you remove the book you haven't touched in the longest time.

> [!NOTE]
> LRU stands for "Least Recently Used" - a strategy that prioritizes recently accessed items over those that haven't been accessed for a while.

## The Challenge 🎯

We need to implement an LRU Cache with the following operations:

- `LRUCache(int capacity)`: Create a new cache that can hold up to `capacity` items
- `int get(key)`: Retrieve a value by its key (and mark it as recently used)
- `void put(key, value)`: Add or update a key-value pair (and mark it as recently used)

> [!TIP]
> The key constraint: both operations must execute in O(1) time complexity - meaning they need to be constant time regardless of how many items are in the cache!

## Why is this Important? 🌟

LRU Caches are fundamental building blocks in computing systems, appearing in:

- Web browsers (caching recently visited pages)
- Operating systems (managing memory pages)
- Database systems (caching query results)
- Content Delivery Networks (storing frequently accessed content)
- Any application where you need to efficiently manage limited memory resources

## Let's Visualize It 📊

Imagine a cache with capacity = 2:

```mermaid
graph LR
    A[Empty LRU Cache]
    A -->|put(1,1)| B[Cache: {1=1}]
    B -->|put(2,2)| C[Cache: {1=1, 2=2}]
    C -->|get(1)| D[Cache: {1=1, 2=2}]
    D -->|put(3,3)| E[Cache: {1=1, 3=3}]
    E -->|get(2)| F[Returns: -1 ❌]
```

<details>
<summary>What happened to key 2?</summary>

When we added key 3, we had to evict something because our capacity was only 2.
Since key 2 was the least recently used (key 1 was just accessed), it was removed from the cache.
</details>

## Key Concepts to Understand 🔑

1. **Recency Tracking**: We need to keep track of which items were accessed most recently
2. **Efficient Lookup**: We need O(1) access to any item by its key
3. **Capacity Management**: We need to efficiently remove the least recently used item

> [!WARNING]
> The main challenge is combining all these requirements while maintaining O(1) time complexity for all operations!

## Think About It ✨

As you go through this lesson, try to answer these questions:

- How would you track the "recency" of items efficiently?
- What data structures might help us achieve the O(1) time requirement?
- What happens when we access an existing item - how do we update its "recency"?

Let's explore these questions in the next lessons! 