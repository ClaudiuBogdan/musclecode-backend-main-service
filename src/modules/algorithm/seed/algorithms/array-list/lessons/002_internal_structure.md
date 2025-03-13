---
title: Under the Hood - How ArrayLists Work
---

# 🔧 The Internal Structure of ArrayLists

To truly understand ArrayLists, we need to peek under the hood and see how they're built. This knowledge will help you make better decisions about when and how to use them.

## 🧱 The Building Blocks

At its core, an ArrayList is built on top of a regular array. However, it adds a layer of intelligence to manage that array dynamically:

```mermaid
graph TD
    A[ArrayList] --> B[Internal Array]
    A --> C[Size Tracking]
    A --> D[Capacity Management]
    A --> E[Resizing Logic]
```

Let's break down these components:

### 1️⃣ Internal Array

The actual data is stored in a regular array. This is why ArrayLists maintain the fast random access property - they can jump directly to any index in constant time.

### 2️⃣ Size Tracking

The ArrayList keeps track of how many elements are actually stored, which might be different from the capacity of the internal array.

### 3️⃣ Capacity Management

The ArrayList monitors how full the internal array is and decides when it needs more space.

### 4️⃣ Resizing Logic

When more space is needed, the ArrayList creates a new, larger array and copies all elements over.

## 🔄 The Resizing Process

The magic of ArrayLists happens during resizing. Let's visualize this process:

```mermaid
graph TD
    A[Original Array: 5 elements, capacity 8] --> B[Add 4 more elements]
    B --> C{Is array full?}
    C -->|Yes| D[Create new array with double capacity]
    D --> E[Copy all elements to new array]
    E --> F[Add new element to new array]
    C -->|No| G[Add element to existing array]
```

> [!NOTE]
> Most ArrayList implementations double the capacity when resizing. This amortizes the cost of resizing over many operations.

## 🧮 A Simple Implementation

Here's a simplified version of how an ArrayList might be implemented:

```javascript
class ArrayList {
  constructor() {
    this.data = new Array(10); // Initial capacity of 10
    this.size = 0;             // Current number of elements
  }

  add(element) {
    // Check if we need to resize
    if (this.size === this.data.length) {
      // Create new array with double capacity
      const newArray = new Array(this.data.length * 2);
      
      // Copy all existing elements
      for (let i = 0; i < this.size; i++) {
        newArray[i] = this.data[i];
      }
      
      // Replace old array with new one
      this.data = newArray;
    }
    
    // Add the new element and increment size
    this.data[this.size] = element;
    this.size++;
  }
}
```

> [!TIP]
> Notice how the `size` property tracks the number of elements, while the array's `length` represents its capacity.

## 🤔 Think About It

<details>
<summary>Why not just resize the array by adding one more slot each time?</summary>

If we only increased the capacity by 1 each time, we'd need to resize and copy all elements for every single addition after the array is full. This would make adding elements an O(n) operation every time, which is very inefficient for large lists.

By doubling the capacity, we ensure that resizing happens less frequently. This makes the average cost of adding an element O(1) - much more efficient!
</details>

<details>
<summary>What happens to the old array after resizing?</summary>

In garbage-collected languages like JavaScript, Java, or Python, the old array will be automatically cleaned up when there are no more references to it. In languages with manual memory management like C++, the implementation would need to explicitly free the memory used by the old array.
</details>

## 🎯 Key Takeaways

- An ArrayList uses a regular array internally
- It tracks both size (elements used) and capacity (total available slots)
- When the array fills up, it creates a new, larger array and copies all elements
- This resizing strategy provides a good balance between memory usage and performance

In the next lesson, we'll explore how to add elements to an ArrayList and understand the efficiency of this operation. 