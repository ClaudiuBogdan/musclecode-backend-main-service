def is_palindrome(s: str) -> bool:
    """
    Recursive solution to check if a string is a palindrome.
    
    Args:
        s: The string to check.
    
    Returns:
        True if the string is a palindrome; False otherwise.
    """
    filtered = "".join(char.lower() for char in s if char.isalnum())
    
    def helper(left: int, right: int) -> bool:
        if left >= right:
            return True
        if filtered[left] != filtered[right]:
            return False
        return helper(left + 1, right - 1)
    
    return helper(0, len(filtered) - 1) 