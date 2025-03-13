from typing import List

def bubble_sort(nums: List[int]) -> List[int]:
    """
    Implements the Bubble Sort algorithm iteratively.
    
    Args:
        nums: A list of integers.
    
    Returns:
        The sorted list in ascending order.
    """
    n = len(nums)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
        if not swapped:
            break
    return nums 