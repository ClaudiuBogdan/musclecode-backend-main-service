---
title: The Frequency Counter Approach - Counting Characters
---

# 🧮 The Frequency Counter Approach

A more efficient way to check if two strings are anagrams is to use a frequency counter. This approach counts the occurrences of each character in both strings and compares the counts.

## 📝 The Algorithm

Here's how the frequency counter approach works:

1. Check if the strings have the same length
2. Create a data structure to count character frequencies in the first string
3. Decrement the counts for each character in the second string
4. Check if all counts are zero at the end

## 💻 Implementation

```javascript
function isAnagram(s1, s2) {
  // Check if lengths are equal
  if (s1.length !== s2.length) return false;

  // Create a frequency counter object
  const count = {};
  
  // Count characters in the first string
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  // Decrement counts for characters in the second string
  for (let char of s2) {
    // If character doesn't exist or count is 0, strings aren't anagrams
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }
  
  // If we've made it here, the strings are anagrams
  return true;
}
```

## 🔍 How It Works

Let's trace through an example:

**Example**: `s1 = "listen"`, `s2 = "silent"`

1. Check lengths: both are 6 characters ✓
2. Create frequency counter for `s1`:
   ```
   { 'l': 1, 'i': 1, 's': 1, 't': 1, 'e': 1, 'n': 1 }
   ```
3. Process `s2` and decrement counts:
   - 's': 1 → 0
   - 'i': 1 → 0
   - 'l': 1 → 0
   - 'e': 1 → 0
   - 'n': 1 → 0
   - 't': 1 → 0
4. All counts are zero, return `true`

## 📊 Complexity Analysis

- **Time Complexity**: O(n), where n is the length of the strings
  - We iterate through each string once
  - Hash table operations are O(1) on average

- **Space Complexity**: O(k), where k is the number of unique characters
  - In practice, this is often O(1) since the character set is usually limited

## 🌟 Advantages Over Sorting

The frequency counter approach has several advantages:
- **More efficient**: O(n) vs O(n log n) time complexity
- **Early termination**: Can return false as soon as a mismatch is found
- **More flexible**: Can be easily modified to handle case-insensitivity or ignore certain characters

## 🧠 Enhanced Visualization

Let's visualize the entire process step by step:

```
Checking if "listen" and "silent" are anagrams:

Step 1: Initialize empty frequency map
{}

Step 2: Process each character in "listen"
Process 'l': { l: 1 }
Process 'i': { l: 1, i: 1 }
Process 's': { l: 1, i: 1, s: 1 }
Process 't': { l: 1, i: 1, s: 1, t: 1 }
Process 'e': { l: 1, i: 1, s: 1, t: 1, e: 1 }
Process 'n': { l: 1, i: 1, s: 1, t: 1, e: 1, n: 1 }

Step 3: Process each character in "silent"
Process 's': { l: 1, i: 1, s: 0, t: 1, e: 1, n: 1 }
Process 'i': { l: 1, i: 0, s: 0, t: 1, e: 1, n: 1 }
Process 'l': { l: 0, i: 0, s: 0, t: 1, e: 1, n: 1 }
Process 'e': { l: 0, i: 0, s: 0, t: 1, e: 0, n: 1 }
Process 'n': { l: 0, i: 0, s: 0, t: 1, e: 0, n: 0 }
Process 't': { l: 0, i: 0, s: 0, t: 0, e: 0, n: 0 }

Step 4: All counts are zero, so they are anagrams!
```

## 🔄 Alternative Implementations

### Using Map in JavaScript

```javascript
function isAnagram(s1, s2) {
  // Check if lengths are equal
  if (s1.length !== s2.length) return false;

  // Create a frequency counter using Map
  const count = new Map();
  
  // Count characters in the first string
  for (let char of s1) {
    count.set(char, (count.get(char) || 0) + 1);
  }
  
  // Decrement counts for characters in the second string
  for (let char of s2) {
    // If character doesn't exist or count is 0, strings aren't anagrams
    if (!count.has(char) || count.get(char) === 0) {
      return false;
    }
    count.set(char, count.get(char) - 1);
  }
  
  return true;
}
```

### Using Array for ASCII Characters

```javascript
function isAnagram(s1, s2) {
  // Check if lengths are equal
  if (s1.length !== s2.length) return false;

  // Create a frequency array for ASCII characters (0-127)
  const counts = new Array(128).fill(0);
  
  // Count characters in the first string
  for (let i = 0; i < s1.length; i++) {
    counts[s1.charCodeAt(i)]++;
  }
  
  // Decrement counts for characters in the second string
  for (let i = 0; i < s2.length; i++) {
    if (counts[s2.charCodeAt(i)] === 0) {
      return false;
    }
    counts[s2.charCodeAt(i)]--;
  }
  
  return true;
}
```

This array-based approach can be more efficient for strings with ASCII characters, as array access is typically faster than object property access.

## 💭 Interactive Exercise

Try tracing through this example yourself:

Check if "anagram" and "nagaram" are anagrams:

1. First, create a frequency map for "anagram"
2. Then, process each character in "nagaram" and decrement counts
3. Check if all counts are zero at the end

<details>
<summary>Solution</summary>

1. Frequency map for "anagram": 
   ```
   { 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1 }
   ```

2. Process "nagaram":
   - 'n': { 'a': 3, 'n': 0, 'g': 1, 'r': 1, 'm': 1 }
   - 'a': { 'a': 2, 'n': 0, 'g': 1, 'r': 1, 'm': 1 }
   - 'g': { 'a': 2, 'n': 0, 'g': 0, 'r': 1, 'm': 1 }
   - 'a': { 'a': 1, 'n': 0, 'g': 0, 'r': 1, 'm': 1 }
   - 'r': { 'a': 1, 'n': 0, 'g': 0, 'r': 0, 'm': 1 }
   - 'a': { 'a': 0, 'n': 0, 'g': 0, 'r': 0, 'm': 1 }
   - 'm': { 'a': 0, 'n': 0, 'g': 0, 'r': 0, 'm': 0 }

3. All counts are zero, so they are anagrams!
</details>

## 💭 Think About It

What would happen if we tried to use this algorithm on strings with different lengths? What about strings with the same length but different characters?

> 💡 **Tip**: The frequency counter approach is often the preferred solution for anagram checking in real-world applications due to its efficiency. 