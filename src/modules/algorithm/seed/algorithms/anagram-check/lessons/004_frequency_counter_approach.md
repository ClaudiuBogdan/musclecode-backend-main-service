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

## 🧠 Visualization

```
"listen" vs "silent"

Step 1: Count frequencies in "listen"
┌───┬───┐
│ l │ 1 │
│ i │ 1 │
│ s │ 1 │
│ t │ 1 │
│ e │ 1 │
│ n │ 1 │
└───┴───┘

Step 2: Process "silent" and decrement counts
's' → Decrement count for 's' (1 → 0)
'i' → Decrement count for 'i' (1 → 0)
'l' → Decrement count for 'l' (1 → 0)
'e' → Decrement count for 'e' (1 → 0)
'n' → Decrement count for 'n' (1 → 0)
't' → Decrement count for 't' (1 → 0)

Step 3: All counts are zero, so they are anagrams!
```

## 💭 Think About It

What would happen if we tried to use this algorithm on strings with different lengths? What about strings with the same length but different characters?

> 💡 **Tip**: The frequency counter approach is often the preferred solution for anagram checking in real-world applications due to its efficiency. 