---
title: Understanding the Longest Common Subsequence Problem
---

# The Longest Common Subsequence Problem 🧩

> [!NOTE]
> In this lesson, we'll understand what the Longest Common Subsequence (LCS) problem is, why it's important, and explore some everyday examples to build our intuition.

## What is a Subsequence? 🤔

Before diving into the problem, let's clarify what a **subsequence** actually is:

A subsequence is a sequence that can be derived from another sequence by **deleting some or no elements** without changing the **order** of the remaining elements.

> [!TIP]
> Think of a subsequence as taking the original sequence and "crossing out" some characters while keeping others in their original order.

For example, "ace" is a subsequence of "abcde" because you can delete the characters 'b' and 'd' from "abcde" to get "ace" while maintaining the original order.

## Problem Statement 📝

The Longest Common Subsequence (LCS) problem asks:

> Given two strings, find the longest subsequence present in both of them.

**Formal definition**: Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

## Examples to Build Intuition 🌟

### Example 1

```
text1 = "abcde"
text2 = "ace"
```

The longest common subsequence is "ace" with length 3.

<details>
<summary>Why is this the answer?</summary>

"ace" is a subsequence of "abcde" (we can remove 'b' and 'd').
"ace" is also a subsequence of "ace" (it's the same string).
There's no longer subsequence common to both strings.
</details>

### Example 2

```
text1 = "abc"
text2 = "abc"
```

The longest common subsequence is "abc" with length 3.

### Example 3

```
text1 = "abc"
text2 = "def"
```

There is no common subsequence between the two strings, so the answer is 0.

## Real-World Applications 🌍

The LCS algorithm is used in many real-world applications:

1. **DNA Sequence Analysis** 🧬 - Finding similarities between genetic sequences
2. **Version Control Systems** 📚 - Tools like Git use LCS-based algorithms to reconcile changes
3. **Spell Checking** ✓ - Identifying potential corrections for misspelled words
4. **Plagiarism Detection** 🔍 - Finding similarities between documents
5. **File Comparison** 📄 - Showing differences between text files

## Key Distinction: Subsequence vs. Substring ⚠️

> [!WARNING]
> Don't confuse subsequence with substring! A substring must be contiguous, while a subsequence doesn't need to be.

For example:
- "ace" is a subsequence of "abcde" but not a substring
- "bcd" is both a subsequence and a substring of "abcde"

## Think About It 💭

Before moving to the next step, ask yourself:

1. What's the longest common subsequence in "hello" and "wheel"?
2. Can you think of an efficient way to find the LCS of two strings?
3. How would you approach this problem if you were solving it by hand?

In the next lesson, we'll develop our intuition for solving this problem and begin building our solution! 