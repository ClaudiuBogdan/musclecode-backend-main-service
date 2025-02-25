from typing import List

def linear_search(nums: List[int], target: int) -> int:
    """
    Implements linear search algorithm iteratively.
    
    Args:
        nums: A list of integers.
        target: The integer to search for.
    
    Returns:
        The index of the target if found, -1 otherwise.
    """
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1 