from typing import List

def bubble_sort(nums: List[int]) -> List[int]:
    """
    Implements the Bubble Sort algorithm recursively.
    
    Args:
        nums: A list of integers.
    
    Returns:
        The sorted list in ascending order.
    """
    return bubble_sort_recursive(nums, len(nums))

def bubble_sort_recursive(nums: List[int], n: int) -> List[int]:
    if n == 1:
        return nums
    for i in range(n - 1):
        if nums[i] > nums[i + 1]:
            nums[i], nums[i + 1] = nums[i + 1], nums[i]
    return bubble_sort_recursive(nums, n - 1) 