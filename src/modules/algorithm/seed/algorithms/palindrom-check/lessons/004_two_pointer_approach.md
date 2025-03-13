---
title: The Two-Pointer Approach
---

# 👉👈 The Two-Pointer Approach

Now that we've preprocessed our string, we're ready to implement the most efficient method for checking palindromes: the two-pointer technique.

## How Does the Two-Pointer Approach Work? 🧐

The two-pointer approach is elegant in its simplicity:

1. Initialize two pointers: one at the beginning (`left`) and one at the end (`right`) of the string
2. Compare the characters at these positions
3. If they match, move the pointers toward each other and continue
4. If they don't match, the string is not a palindrome
5. If the pointers meet or cross, we've successfully verified all characters match and the string is a palindrome

## Visual Walkthrough 🎬

Let's trace through an example with the preprocessed string `"racecar"`:

```mermaid
graph LR
    start([Start]) --> A
    
    subgraph "First Iteration"
    A["left = 0, right = 6"] --> B["Compare 'r' and 'r'"]
    B --> C["Match! Move pointers"]
    end
    
    subgraph "Second Iteration"
    C --> D["left = 1, right = 5"] --> E["Compare 'a' and 'a'"]
    E --> F["Match! Move pointers"]
    end
    
    subgraph "Third Iteration"
    F --> G["left = 2, right = 4"] --> H["Compare 'c' and 'c'"]
    H --> I["Match! Move pointers"]
    end
    
    subgraph "Final Check"
    I --> J["left = 3, right = 3"] --> K["Pointers meet"]
    K --> L["All characters match!"]
    end
    
    L --> end([Palindrome: true])
```

## Code Implementation 💻

Here's how we implement the two-pointer approach after preprocessing:

### JavaScript
```javascript
function isPalindrome(s) {
  // Preprocess the string
  const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Initialize pointers
  let left = 0;
  let right = filtered.length - 1;
  
  // Compare characters from both ends
  while (left < right) {
    if (filtered[left] !== filtered[right]) {
      return false;  // Not a palindrome
    }
    left++;    // Move left pointer forward
    right--;   // Move right pointer backward
  }
  
  // All characters matched, it's a palindrome
  return true;
}
```

### Python
```python
def is_palindrome(s):
    # Preprocess the string
    filtered = ''.join(char.lower() for char in s if char.isalnum())
    
    # Initialize pointers
    left = 0
    right = len(filtered) - 1
    
    # Compare characters from both ends
    while left < right:
        if filtered[left] != filtered[right]:
            return False  # Not a palindrome
        left += 1   # Move left pointer forward
        right -= 1  # Move right pointer backward
    
    # All characters matched, it's a palindrome
    return True
```

## Understanding the Algorithm Step by Step 🔍

Let's break down what's happening in each major step:

1. **Preprocessing** 🧹
   ```javascript
   const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
   ```
   This prepares our string by making it lowercase and removing non-alphanumeric characters.

2. **Pointer Initialization** 📍
   ```javascript
   let left = 0;
   let right = filtered.length - 1;
   ```
   We set up our two pointers at opposite ends of the string.

3. **Character Comparison Loop** 🔄
   ```javascript
   while (left < right) {
     if (filtered[left] !== filtered[right]) {
       return false;
     }
     left++;
     right--;
   }
   ```
   We compare characters and move inward until the pointers cross or we find non-matching characters.

4. **Final Verification** ✅
   ```javascript
   return true;
   ```
   If we exit the loop without returning false, all characters matched and we have a palindrome.

## Edge Cases to Consider ⚠️

> [!WARNING]
> Don't forget these special cases!

1. **Empty Strings**: An empty string is considered a palindrome (same forward and backward).
2. **Single-Character Strings**: A single character is always a palindrome.
3. **Strings with Only Non-Alphanumeric Characters**: After preprocessing, the string would be empty, which is considered a palindrome.

## The Magic of Memory Efficiency 🧙‍♂️

> [!NOTE]
> The two-pointer approach uses O(1) extra space regardless of input size!

Unlike the string reversal approach (which uses O(n) extra space to store the reversed string), the two-pointer method only needs to track two indices, making it extremely memory efficient.

## Try It Yourself 🧠

Walk through the algorithm manually with these examples:

1. `"level"` (after preprocessing)
2. `"hello"` (after preprocessing)

<details>
<summary>Trace for "level"</summary>

- Iteration 1: Compare 'l' (left=0) and 'l' (right=4) → Match → Move pointers
- Iteration 2: Compare 'e' (left=1) and 'e' (right=3) → Match → Move pointers
- Iteration 3: Compare 'v' (left=2) and 'v' (right=2) → Pointers meet → All matched
- Result: true (it's a palindrome)
</details>

<details>
<summary>Trace for "hello"</summary>

- Iteration 1: Compare 'h' (left=0) and 'o' (right=4) → No match → Not a palindrome
- Result: false (not a palindrome)
</details>

In the next lesson, we'll explore an alternative approach: the string reversal method! 