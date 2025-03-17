---
title: Interactive Exercises - Practice Your Anagram Skills
---

# 🏋️ Interactive Exercises

The best way to master the anagram check algorithm is through practice. This lesson provides hands-on exercises to reinforce your understanding and help you apply what you've learned.

## Exercise 1: Trace Through Manually

For each pair of strings below, determine if they are anagrams by creating a frequency counter. Work through the process step by step:

1. "tea" and "eat"
2. "hello" and "world"
3. "astronomer" and "moon starer" (ignore spaces)

<details>
<summary>Solution for "tea" and "eat"</summary>

1. Check lengths: "tea" (3) = "eat" (3) ✓
2. Create frequency counter for "tea":
   ```
   { 't': 1, 'e': 1, 'a': 1 }
   ```
3. Process "eat":
   - 'e': { 't': 1, 'e': 0, 'a': 1 }
   - 'a': { 't': 1, 'e': 0, 'a': 0 }
   - 't': { 't': 0, 'e': 0, 'a': 0 }
4. All counts are zero, so they are anagrams! ✓
</details>

<details>
<summary>Solution for "hello" and "world"</summary>

1. Check lengths: "hello" (5) = "world" (5) ✓
2. Create frequency counter for "hello":
   ```
   { 'h': 1, 'e': 1, 'l': 2, 'o': 1 }
   ```
3. Process "world":
   - 'w': Not in counter, return false ❌
   
They are not anagrams because they contain different characters.
</details>

<details>
<summary>Solution for "astronomer" and "moon starer"</summary>

1. Remove spaces and check lengths: 
   - "astronomer" (10) 
   - "moonstarer" (10) ✓
2. Create frequency counter for "astronomer":
   ```
   { 'a': 1, 's': 1, 't': 1, 'r': 2, 'o': 2, 'n': 1, 'm': 1, 'e': 1 }
   ```
3. Process "moonstarer":
   - 'm': { 'a': 1, 's': 1, 't': 1, 'r': 2, 'o': 2, 'n': 1, 'm': 0, 'e': 1 }
   - 'o': { 'a': 1, 's': 1, 't': 1, 'r': 2, 'o': 1, 'n': 1, 'm': 0, 'e': 1 }
   - 'o': { 'a': 1, 's': 1, 't': 1, 'r': 2, 'o': 0, 'n': 1, 'm': 0, 'e': 1 }
   - 'n': { 'a': 1, 's': 1, 't': 1, 'r': 2, 'o': 0, 'n': 0, 'm': 0, 'e': 1 }
   - 's': { 'a': 1, 's': 0, 't': 1, 'r': 2, 'o': 0, 'n': 0, 'm': 0, 'e': 1 }
   - 't': { 'a': 1, 's': 0, 't': 0, 'r': 2, 'o': 0, 'n': 0, 'm': 0, 'e': 1 }
   - 'a': { 'a': 0, 's': 0, 't': 0, 'r': 2, 'o': 0, 'n': 0, 'm': 0, 'e': 1 }
   - 'r': { 'a': 0, 's': 0, 't': 0, 'r': 1, 'o': 0, 'n': 0, 'm': 0, 'e': 1 }
   - 'e': { 'a': 0, 's': 0, 't': 0, 'r': 1, 'o': 0, 'n': 0, 'm': 0, 'e': 0 }
   - 'r': { 'a': 0, 's': 0, 't': 0, 'r': 0, 'o': 0, 'n': 0, 'm': 0, 'e': 0 }
4. All counts are zero, so they are anagrams! ✓
</details>

## Exercise 2: Find the Bug

The following implementation has a bug. Can you identify and fix it?

```javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  const count = {};
  
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of s2) {
    count[char]--;
  }
  
  return true; // Bug: Doesn't check if all counts are zero!
}
```

<details>
<summary>Solution</summary>

The bug is that the function doesn't verify that all character counts have been reduced to zero after processing the second string. It simply returns true regardless.

Here's the corrected implementation:

```javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  const count = {};
  
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of s2) {
    // If character doesn't exist in count or count is already 0
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }
  
  // Verify all counts are zero
  for (let char in count) {
    if (count[char] !== 0) {
      return false;
    }
  }
  
  return true;
}
```

Alternatively, a more efficient solution would check during the second loop:

```javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  const count = {};
  
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of s2) {
    // If character doesn't exist in count or count is already 0
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }
  
  return true; // Safe because we've already checked for mismatches
}
```

This works because:
1. We've verified the strings have the same length
2. We return false if any character in s2 isn't in s1 or has been used up
3. If we process all characters in s2 without returning false, all counts must be zero
</details>

## Exercise 3: Optimize It

The following anagram checker works but isn't optimized. Modify it to include at least three optimizations:

```javascript
function isAnagram(s1, s2) {
  return s1.split('').sort().join('') === s2.split('').sort().join('');
}
```

<details>
<summary>Solution</summary>

Here's an optimized version with several improvements:

```javascript
function isAnagram(s1, s2) {
  // Optimization 1: Early length check
  if (s1.length !== s2.length) return false;
  
  // Optimization 2: Character set check before full processing
  // If the strings have different sets of unique characters, they can't be anagrams
  const uniqueChars1 = new Set(s1);
  const uniqueChars2 = new Set(s2);
  
  if (uniqueChars1.size !== uniqueChars2.size) return false;
  
  // Quick check for small strings with all unique characters
  if (uniqueChars1.size === s1.length) {
    for (const char of uniqueChars1) {
      if (!uniqueChars2.has(char)) return false;
    }
    return true;
  }
  
  // Optimization 3: Use frequency counter instead of sorting
  const count = {};
  
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  // Optimization 4: Early termination in the second loop
  for (let char of s2) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}
```

The optimizations are:
1. Early length check to avoid unnecessary processing
2. Character set comparison to quickly identify non-anagrams
3. Special case handling for strings with all unique characters
4. Using a frequency counter instead of sorting (O(n) vs O(n log n))
5. Early termination as soon as a mismatch is found
</details>

## Exercise 4: Implement Case-Insensitive Anagram Checker

Modify the frequency counter approach to create a case-insensitive anagram checker that ignores spaces and punctuation.

<details>
<summary>Solution</summary>

```javascript
function isAnagram(s1, s2) {
  // Remove non-alphanumeric characters and convert to lowercase
  s1 = s1.toLowerCase().replace(/[^a-z0-9]/g, '');
  s2 = s2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (s1.length !== s2.length) return false;
  
  const count = {};
  
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of s2) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}

// Test cases
console.log(isAnagram("Listen", "Silent")); // true
console.log(isAnagram("Astronomer", "Moon starer")); // true
console.log(isAnagram("A gentleman", "Elegant man")); // true
console.log(isAnagram("Eleven plus two", "Twelve plus one")); // true
```

This implementation:
1. Converts both strings to lowercase
2. Removes all non-alphanumeric characters (spaces, punctuation, etc.)
3. Uses the frequency counter approach to check if they're anagrams
</details>

## Exercise 5: Find All Anagrams in a List

Write a function that groups anagrams from a list of words.

```javascript
// Example:
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

<details>
<summary>Solution</summary>

```javascript
function groupAnagrams(words) {
  const groups = {};
  
  for (const word of words) {
    // Create anagram signature (sorted characters)
    const signature = word.split('').sort().join('');
    
    // Add to appropriate group
    if (!groups[signature]) {
      groups[signature] = [];
    }
    groups[signature].push(word);
  }
  
  // Convert object to array of groups
  return Object.values(groups);
}

// Test
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(words));
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

This solution:
1. Creates a signature for each word (sorted characters)
2. Groups words by their signatures
3. Returns the groups as an array
</details>

## Challenge: Minimum Changes to Make Anagrams

Write a function that calculates the minimum number of character changes required to make two strings anagrams of each other.

```javascript
// Example:
// Input: s1 = "listen", s2 = "silent"
// Output: 0 (already anagrams)

// Example:
// Input: s1 = "hello", s2 = "world"
// Output: 4 (need to change 4 characters)
```

<details>
<summary>Solution</summary>

```javascript
function minChangesToAnagram(s1, s2) {
  // If lengths are different, we need to add/remove characters
  if (s1.length !== s2.length) {
    return Math.abs(s1.length - s2.length);
  }
  
  // Count character frequencies in s1
  const count = {};
  for (let char of s1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  // Process s2 and count differences
  let changes = 0;
  
  for (let char of s2) {
    if (!count[char] || count[char] === 0) {
      // Character in s2 not in s1 or already used up
      changes++;
    } else {
      // Decrement count for matched character
      count[char]--;
    }
  }
  
  return changes;
}

// Test cases
console.log(minChangesToAnagram("listen", "silent")); // 0
console.log(minChangesToAnagram("hello", "world")); // 4
console.log(minChangesToAnagram("tea", "eat")); // 0
console.log(minChangesToAnagram("tea", "toe")); // 1
```

This solution:
1. Handles the case where strings have different lengths
2. Builds a frequency counter for the first string
3. Processes the second string, counting characters that don't match
4. Returns the total number of changes needed
</details>

## 💭 Think About It

1. How would you modify the anagram check algorithm to find all anagrams of a word in a large dictionary efficiently?

2. Can you think of a way to check if a string is an anagram of any substring of another string?

3. How would you handle anagram checking for languages with non-Latin alphabets or special character combinations?

> 💡 **Tip**: These exercises are designed to deepen your understanding of the anagram check algorithm and its variations. Try to solve them on your own before looking at the solutions. 