def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Implements the longest common subsequence algorithm using recursion with memoization.

    Args:
        text1 (str): First string.
        text2 (str): Second string.

    Returns:
        int: The length of the longest common subsequence.
    """
    memo = {}

    def lcs(i: int, j: int) -> int:
        if i == len(text1) or j == len(text2):
            return 0
        if (i, j) in memo:
            return memo[(i, j)]
        if text1[i] == text2[j]:
            memo[(i, j)] = 1 + lcs(i + 1, j + 1)
        else:
            memo[(i, j)] = max(lcs(i + 1, j), lcs(i, j + 1))
        return memo[(i, j)]
    
    return lcs(0, 0) 