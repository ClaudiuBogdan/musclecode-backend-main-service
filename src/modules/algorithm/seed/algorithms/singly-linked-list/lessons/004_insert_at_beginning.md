---
title: Insertion at the Beginning
---

# 🎬 Insertion at the Beginning

Let's implement our first operation: adding a new node to the beginning of our linked list. This is one of the simplest and most efficient operations we can perform!

## Why Insert at the Beginning? 🤔

Insertion at the beginning of a linked list is:
- **Efficient**: It's an O(1) operation - constant time regardless of list size
- **Simple**: It requires minimal pointer manipulation
- **Useful**: Many algorithms like stack implementations use this pattern

## The Algorithm Step by Step 📝

To insert a node at the beginning of a singly linked list:

1. Create a new node with the given data
2. Set the new node's `next` pointer to the current `head`
3. Update the list's `head` to point to the new node

Let's visualize this with diagrams:

### Before Insertion:
```mermaid
graph LR
    Head["head"] --> N1["Node: 20"]
    N1 --> N2["Node: 30"]
    N2 --> Null["null"]
    style Head fill:#f9f,stroke:#333,stroke-width:2px
    style Null fill:#fcc,stroke:#333,stroke-width:1px
```

### Step 1: Create a new node (with data 10)
```mermaid
graph LR
    Head["head"] --> N1["Node: 20"]
    N1 --> N2["Node: 30"]
    N2 --> Null["null"]
    NewNode["New Node: 10"]
    style Head fill:#f9f,stroke:#333,stroke-width:2px
    style Null fill:#fcc,stroke:#333,stroke-width:1px
    style NewNode fill:#bfb,stroke:#333,stroke-width:2px
```

### Step 2: Point new node's next to current head
```mermaid
graph LR
    Head["head"] --> N1["Node: 20"]
    N1 --> N2["Node: 30"]
    N2 --> Null["null"]
    NewNode["New Node: 10"] -.-> N1
    style Head fill:#f9f,stroke:#333,stroke-width:2px
    style Null fill:#fcc,stroke:#333,stroke-width:1px
    style NewNode fill:#bfb,stroke:#333,stroke-width:2px
```

### Step 3: Update head to point to new node
```mermaid
graph LR
    Head["head"] -.-> NewNode["Node: 10"]
    NewNode --> N1["Node: 20"]
    N1 --> N2["Node: 30"]
    N2 --> Null["null"]
    style Head fill:#f9f,stroke:#333,stroke-width:2px
    style Null fill:#fcc,stroke:#333,stroke-width:1px
    style NewNode fill:#bfb,stroke:#333,stroke-width:2px
```

## Implementation in Code 💻

Here's how we implement insertion at the beginning:

```typescript
insertAtBeginning(data: any): void {
  // Step 1: Create a new node with the given data
  const newNode = new Node(data);
  
  // Step 2: Set the new node's next pointer to the current head
  newNode.next = this.head;
  
  // Step 3: Update the list's head to point to the new node
  this.head = newNode;
}
```

> [!NOTE]
> This method works for both empty and non-empty lists! If the list is empty (`this.head` is `null`), then the new node's `next` will be `null`, and the `head` will point to this new node, making it the only node in the list.

## Special Cases to Consider 🧐

This method handles two important cases:

### Case 1: Inserting into an empty list
```mermaid
graph LR
    BeforeHead["head (before)"] --> Null1["null"]
    Create["Create newNode"] --> NewNode["Node: 10<br/>next: null"]
    Link["newNode.next = head"] --> NoChange["No change (head is null)"]
    UpdateHead["head = newNode"] --> AfterHead["head (after)"] --> NewNode
    style BeforeHead fill:#f9f,stroke:#333,stroke-width:2px
    style AfterHead fill:#f9f,stroke:#333,stroke-width:2px
    style Null1 fill:#fcc,stroke:#333,stroke-width:1px
    style NewNode fill:#bfb,stroke:#333,stroke-width:2px
```

### Case 2: Inserting into a non-empty list
```mermaid
graph LR
    BeforeHead["head (before)"] --> ExistingNode["Existing Node"]
    Create["Create newNode"] --> NewNode["New Node"]
    Link["newNode.next = head"] --> PointToExisting["newNode points to existing node"]
    UpdateHead["head = newNode"] --> AfterHead["head (after)"] --> NewNode --> ExistingNode
    style BeforeHead fill:#f9f,stroke:#333,stroke-width:2px
    style AfterHead fill:#f9f,stroke:#333,stroke-width:2px
    style NewNode fill:#bfb,stroke:#333,stroke-width:2px
    style ExistingNode fill:#bbf,stroke:#333,stroke-width:1px
```

> [!TIP]
> The order of operations matters! Make sure to set the new node's `next` pointer **before** updating the `head`. Otherwise, you might lose the reference to the rest of the list.

## Time and Space Complexity ⏱️

- **Time Complexity**: O(1) - constant time operation regardless of list size
- **Space Complexity**: O(1) - we only create one new node

## Try It Yourself 💪

<details>
<summary>What would happen if we switched the order of steps 2 and 3 in our code?</summary>

If we updated the head first (step 3) and then set the new node's next pointer (step 2), we would lose the connection to the rest of the list!

The code would look like:
```typescript
// INCORRECT implementation
insertAtBeginning(data: any): void {
  const newNode = new Node(data);
  this.head = newNode;        // Now head points to newNode
  newNode.next = this.head;   // newNode points to itself!
}
```

This creates a cycle where the new node points to itself, and we lose the reference to all the other nodes in the list! 🔄
</details>

In the next lesson, we'll implement another important operation: inserting a node at the end of the list! 🚀 