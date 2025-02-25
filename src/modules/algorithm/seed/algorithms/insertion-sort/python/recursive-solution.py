from typing import List

def insertion_sort(nums: List[int]) -> List[int]:
    """
    Implements the Insertion Sort algorithm recursively.

    Args:
        nums: A list of integers.

    Returns:
        A sorted list of integers.
    """
    _recursive_insertion_sort(nums, len(nums))
    return nums

def _recursive_insertion_sort(nums: List[int], n: int) -> None:
    if n <= 1:
        return
    _recursive_insertion_sort(nums, n - 1)
    last = nums[n - 1]
    j = n - 2
    while j >= 0 and nums[j] > last:
        nums[j + 1] = nums[j]
        j -= 1
    nums[j + 1] = last 