def is_palindrome(s: str) -> bool:
    """
    Iterative solution to check if a string is a palindrome.
    
    Args:
        s: The string to check.
    
    Returns:
        True if the string is a palindrome; False otherwise.
    """
    filtered = "".join(char.lower() for char in s if char.isalnum())
    
    left, right = 0, len(filtered) - 1
    while left < right:
        if filtered[left] != filtered[right]:
            return False
        left += 1
        right -= 1
    return True 