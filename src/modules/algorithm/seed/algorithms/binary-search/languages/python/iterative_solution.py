from typing import List

def binary_search(nums: List[int], target: int) -> int:
    """
    Implements binary search algorithm to find a target number in a sorted array using an iterative approach.

    Args:
        nums: A sorted array of distinct integers in ascending order
        target: The integer to search for in the array

    Returns:
        The index of the target if found, -1 otherwise

    Time Complexity: O(log n) where n is the length of the array
    Space Complexity: O(1) as it uses constant extra space

    The implementation uses two pointers approach:
    - left: points to the start of the current search range
    - right: points to the end of the current search range

    In each iteration:
    1. Calculate the middle point
    2. Compare the middle element with the target
    3. If equal, we found our target
    4. If target is greater, search in right half
    5. If target is smaller, search in left half
    """
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1 