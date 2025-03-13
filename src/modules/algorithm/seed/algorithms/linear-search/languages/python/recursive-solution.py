from typing import List

def linear_search(nums: List[int], target: int) -> int:
    """
    Implements linear search algorithm recursively.
    
    Args:
        nums: A list of integers.
        target: The integer to search for.
    
    Returns:
        The index of the target if found, -1 otherwise.
    """
    return _linear_search_recursive(nums, target, 0)

def _linear_search_recursive(nums: List[int], target: int, index: int) -> int:
    if index >= len(nums):
        return -1
    if nums[index] == target:
        return index
    return _linear_search_recursive(nums, target, index + 1) 