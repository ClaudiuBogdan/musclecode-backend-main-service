from typing import List

def binary_search(nums: List[int], target: int) -> int:
    """
    Implements binary search algorithm to find a target number in a sorted array using a recursive approach.

    Args:
        nums: A sorted array of distinct integers in ascending order
        target: The integer to search for in the array

    Returns:
        The index of the target if found, -1 otherwise

    Time Complexity: O(log n) where n is the length of the array
    Space Complexity: O(log n) due to recursive call stack

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
    return binary_search_helper(nums, target, 0, len(nums) - 1)

def binary_search_helper(nums: List[int], target: int, left: int, right: int) -> int:
    """
    Helper function for recursive binary search

    Args:
        nums: The sorted array to search in
        target: The target value to find
        left: left boundary index of current search space
        right: right boundary index of current search space

    Returns:
        The index of the target if found, -1 otherwise
    """
    if left > right:
        return -1

    mid = left + (right - left) // 2

    if nums[mid] == target:
        return mid

    if nums[mid] < target:
        return binary_search_helper(nums, target, mid + 1, right)

    return binary_search_helper(nums, target, left, mid - 1) 