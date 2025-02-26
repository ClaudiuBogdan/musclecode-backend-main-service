from typing import List

def max_subarray_sum(nums: List[int], k: int) -> int:
    """
    Given an array of integers `nums` and a positive integer `k`, find the maximum sum of any contiguous subarray of size `k`.

    Args:
        nums (List[int]): An array of integers
        k (int): The size of the subarray

    Returns:
        int: The maximum sum of any contiguous subarray of size k
    """
    if len(nums) < k or k <= 0:
        return None

    max_sum = 0
    window_sum = 0

    # Calculate the sum of the first window
    for i in range(k):
        window_sum += nums[i]
    max_sum = window_sum

    # Slide the window and update max_sum
    for i in range(k, len(nums)):
        window_sum = window_sum - nums[i - k] + nums[i]
        max_sum = max(max_sum, window_sum)

    return max_sum 