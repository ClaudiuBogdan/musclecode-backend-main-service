def is_anagram(s1: str, s2: str) -> bool:
    """
    Checks if two strings are anagrams using a recursive approach.
    
    The function removes the first character of s1 and its first occurrence in s2,
    then recursively checks the remaining characters.
    
    Args:
        s1: The first string.
        s2: The second string.
        
    Returns:
        True if s1 and s2 are anagrams, False otherwise.
    """
    if len(s1) != len(s2):
        return False
    if s1 == "":
        return True

    char = s1[0]
    index = s2.find(char)
    if index == -1:
        return False

    new_s2 = s2[:index] + s2[index+1:]
    return is_anagram(s1[1:], new_s2) 