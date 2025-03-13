from typing import List

def max_subarray_sum(nums: List[int]) -> int:
    """
    Given an array of integers, find the contiguous subarray with the largest sum using Kadane's Algorithm (Iterative).

    Args:
        nums (List[int]): An array of integers

    Returns:
        int: The maximum subarray sum
    """
    if not nums:
        return None

    max_so_far = nums[0]
    max_ending_here = nums[0]

    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far 