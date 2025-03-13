from typing import List

def insertion_sort(nums: List[int]) -> List[int]:
    """
    Implements the Insertion Sort algorithm iteratively.

    Args:
        nums: A list of integers.

    Returns:
        A sorted list of integers.
    """
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = key
    return nums 