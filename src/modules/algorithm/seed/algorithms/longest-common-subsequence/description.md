# Longest Common Subsequence

The Longest Common Subsequence (LCS) is a classic dynamic programming problem that finds the longest sequence of elements that appear in the same order (though not necessarily contiguously) in two or more sequences. This algorithm is fundamental in various applications including text comparison, DNA sequence analysis, and version control systems.

## The Challenge

Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

### Example 1

```js
Input: text1 = "abcde", text2 = "ace"
Output: 3
```

_Explanation: The longest common subsequence is "ace" with length 3._

### Example 2

```js
Input: text1 = "abc", text2 = "abc"
Output: 3
```

_Explanation: The longest common subsequence is "abc" with length 3._

### Example 3

```js
Input: text1 = "abc", text2 = "def"
Output: 0
```

_Explanation: There is no common subsequence between the two strings._

<details>
<summary>
### Speed and Efficiency
</summary>

The Longest Common Subsequence algorithm has the following complexity characteristics:

- **Time Complexity**: 
  - **Using Dynamic Programming**: O(m × n), where m and n are the lengths of the two input strings.
  - **Using Naive Recursion**: O(2^(m+n)), which is exponential and impractical for longer strings.
  
- **Space Complexity**: 
  - **Standard Implementation**: O(m × n) for the DP table.
  - **Optimized Implementation**: Can be reduced to O(min(m, n)) by only storing two rows of the DP table at a time.
</details>
<details>
<summary>
### Key Principles
</summary>

The LCS algorithm relies on several core principles:

- **Optimal Substructure**: The solution to the problem can be constructed from solutions to its subproblems.

- **Overlapping Subproblems**: The same subproblems are solved multiple times, making dynamic programming an efficient approach.

- **Bottom-up Construction**: The algorithm builds solutions to larger subproblems using solutions to smaller subproblems.

- **Character Matching**: When characters match, the LCS length increases; when they don't, we take the maximum of excluding either character.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For visual learners, these resources provide excellent explanations of the LCS algorithm:

- [Longest Common Subsequence Problem using Dynamic Programming](https://www.youtube.com/watch?v=sSno9rV8Rhg) - Comprehensive explanation covering recursion, memoization, and dynamic programming approaches
- [Longest Common Subsequence (LeetCode 1143)](https://www.youtube.com/watch?v=ASoaQq66foQ) - Step-by-step walkthrough of the problem with clear visual examples
- [Visualgo - Dynamic Programming](https://visualgo.net/en/dp) - Interactive visualization of dynamic programming problems including LCS
- [CS Dojo - Dynamic Programming](https://www.youtube.com/watch?v=vYquumk4nWw) - Intuitive explanation of the dynamic programming approach

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing the LCS algorithm, watch out for these common mistakes:

- **Confusing LCS with Longest Common Substring**: The substring must be contiguous, while a subsequence doesn't need to be.

- **Incorrect Base Case Handling**: Forgetting to handle empty strings or initializing the DP table incorrectly.

- **Off-by-One Errors**: Misaligning the string indices with the DP table indices.

- **Inefficient Recursion**: Implementing a recursive solution without memoization, leading to exponential time complexity.

- **Backtracking Errors**: When reconstructing the actual subsequence, not following the correct path through the DP table.
</details>
<details>
<summary>
### When and Where to Use LCS
</summary>

The Longest Common Subsequence algorithm is particularly useful in:

- **Text Comparison**: Finding similarities between documents or code files.

- **Bioinformatics**: Comparing DNA, RNA, or protein sequences to identify evolutionary relationships.

- **Version Control Systems**: Tools like Git use LCS-based algorithms to reconcile changes to files.

- **Spell Checking**: Identifying potential corrections for misspelled words.

- **Natural Language Processing**: For tasks like text summarization and machine translation.

However, it may not be ideal for:

- **Very Long Sequences**: When both sequences are extremely long, even O(m×n) might be too slow.

- **Multiple Sequence Alignment**: For more than two sequences, the problem becomes NP-hard.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The LCS algorithm has numerous practical applications:

- **Diff Utilities**: Programs that show differences between text files use LCS to identify common parts.

- **Git and Other Version Control Systems**: For merging changes and resolving conflicts.

- **Plagiarism Detection**: Identifying similarities between documents that might indicate copying.

- **Computational Biology**: Comparing genetic sequences to understand evolutionary relationships.

- **Spelling and Grammar Correction**: Suggesting corrections based on similarity to dictionary words.

- **File Comparison Tools**: Software that highlights differences between versions of documents.
</details>
<details>
<summary>
### Dynamic Programming Approach
</summary>

The standard dynamic programming approach follows these steps:

1. **Create a DP Table**: Initialize a 2D array `dp` of size (m+1) × (n+1), where m and n are the lengths of the input strings.

2. **Base Case**: Set the first row and column to 0, representing empty string comparisons.

3. **Fill the Table**: For each cell (i,j):
   - If the characters match (`text1[i-1] == text2[j-1]`), set `dp[i][j] = dp[i-1][j-1] + 1`
   - Otherwise, set `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

4. **Result**: The value in `dp[m][n]` is the length of the LCS.

5. **Reconstruct the LCS** (optional): Backtrack through the table to find the actual subsequence.

```python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[^0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
```
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related algorithms extend the basic LCS concept:

- **Longest Common Substring**: Finds the longest contiguous sequence common to two strings.

- **Shortest Common Supersequence**: Finds the shortest sequence that has both input strings as subsequences.

- **Longest Increasing Subsequence**: A special case where we find the longest subsequence of elements in increasing order.

- **Edit Distance (Levenshtein Distance)**: Measures the minimum number of operations required to transform one string into another.

- **Hirschberg's Algorithm**: An optimization of LCS that uses O(min(m,n)) space.

- **Hunt-Szymanski Algorithm**: An efficient algorithm for sparse LCS problems.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Longest Common Subsequence problem has been studied in computer science since the early days of algorithm development. It gained prominence in the 1970s with the rise of computational biology and the need to compare DNA sequences. The dynamic programming solution was formalized around this time and has since become a standard example in algorithm textbooks.

The problem's importance grew further with the development of text comparison tools and version control systems. Today, LCS remains a fundamental algorithm in computer science education and a practical tool in numerous applications, demonstrating the enduring value of dynamic programming techniques.
</details>