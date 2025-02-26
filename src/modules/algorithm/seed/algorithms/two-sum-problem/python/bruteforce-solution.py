from typing import List, Optional

def two_sum(nums: List[int], target: int) -> Optional[List[int]]:
    """
    Given an array of integers nums and an integer target, find the indices of the two numbers
    such that they add up to target.

    You may assume that each input would have exactly one solution, and you may not use the same
    element twice.

    Args:
        nums (List[int]): The input list of integers.
        target (int): The target sum.

    Returns:
        Optional[List[int]]: A list containing the indices of the two numbers that add up to the target,
                             or None if no such pair exists.
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return None 