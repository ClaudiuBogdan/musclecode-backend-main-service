def is_anagram(s1: str, s2: str) -> bool:
    """
    Checks if two strings are anagrams using an iterative approach.
    
    Args:
        s1: The first string.
        s2: The second string.
        
    Returns:
        True if s1 and s2 are anagrams, False otherwise.
    """
    if len(s1) != len(s2):
        return False

    count = {}
    for char in s1:
        count[char] = count.get(char, 0) + 1

    for char in s2:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1

    return True 