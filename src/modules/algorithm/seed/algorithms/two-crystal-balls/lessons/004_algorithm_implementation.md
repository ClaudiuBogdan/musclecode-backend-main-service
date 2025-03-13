---
title: Algorithm Implementation - The Two Crystal Balls Solution
---

# 💻 Implementing the Two Crystal Balls Algorithm

> [!NOTE]
> Now that we understand the mathematical intuition behind the optimal solution, let's implement the algorithm step by step.

## 🔍 The Algorithm in Plain English

Our strategy has two phases:
1. Use the first ball to jump by √n floors until it breaks
2. Use the second ball to check floors linearly in the last section before the break

Here's the algorithm broken down into simple steps:

1. Calculate the jump size as √n (square root of number of floors)
2. Jump by this amount with the first ball (check floors at jump, 2×jump, 3×jump, etc.)
3. When the first ball breaks at some jump point j×jump, go back to the previous jump point (j-1)×jump
4. Use the second ball to check each floor from (j-1)×jump+1 to j×jump-1
5. Return the first floor where the ball breaks, or -1 if no ball ever breaks

## 🛠️ Step-by-Step Implementation

Let's implement this algorithm in JavaScript:

### Step 1: Calculate the jump size

```javascript
function twoCrystalBalls(breaks) {
  // Calculate jump amount using square root of array length
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  
  // Rest of algorithm will go here...
}
```

> [!TIP]
> We use Math.floor() to ensure we get an integer jump amount. Using the floor function rather than ceiling or round is an implementation choice - any of these would work fine.

### Step 2: Jump with the first ball

```javascript
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  
  // Jump with first ball
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;  // First ball breaks!
    }
  }
  
  // Rest of algorithm will go here...
}
```

> [!NOTE]
> We start at the jumpAmount floor (rather than floor 0) because we already know the ball won't break at floor 0 (otherwise the problem would be trivial).

### Step 3: Go back to the previous jump point

```javascript
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }
  
  // Go back to previous jump
  i -= jumpAmount;
  
  // Rest of algorithm will go here...
}
```

### Step 4: Linear search with the second ball

```javascript
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }
  
  i -= jumpAmount;
  
  // Linear search with second ball
  for (let j = i; j < breaks.length; ++j) {
    if (breaks[j]) {
      return j;  // Found the exact breaking floor!
    }
  }
  
  // Rest of algorithm will go here...
}
```

### Step 5: Handle the case where balls never break

```javascript
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }
  
  i -= jumpAmount;
  
  for (let j = i; j < breaks.length; ++j) {
    if (breaks[j]) {
      return j;
    }
  }
  
  // If we get here, the balls never break
  return -1;
}
```

## 🧩 Complete Implementation

Here's the complete algorithm implementation:

```javascript
/**
 * Given two crystal balls that will break if dropped from high enough distance,
 * determine the exact spot in which they will break in the most optimized way.
 *
 * @param {boolean[]} breaks - An array of booleans representing whether the ball breaks at that floor.
 * @returns {number} - The index where the balls start breaking, or -1 if they never break.
 */
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jumpAmount;

  for (let j = i; j < breaks.length; ++j) {
    if (breaks[j]) {
      return j;
    }
  }

  return -1;
}
```

## 🎬 Let's Trace Through an Example

Let's trace the algorithm with this example:
```
breaks = [false, false, false, false, false, true, true, true, true]
```

1. **Calculate jump size**: √9 ≈ 3
2. **First ball drops**:
   - Check floor 3: breaks[3] = false, ball doesn't break
   - Check floor 6: breaks[6] = true, ball breaks!
3. **Go back to previous jump**: i = 6 - 3 = 3
4. **Second ball drops**:
   - Check floor 4: breaks[4] = false, ball doesn't break
   - Check floor 5: breaks[5] = true, ball breaks!
5. **Return answer**: 5

In the next lesson, we'll analyze the time and space complexity of our solution and discuss some practical considerations. 