from typing import List

def quick_sort(nums: List[int]) -> List[int]:
    """
    Implements Quick Sort algorithm using a recursive approach.
    
    Args:
        nums: A list of integers.
    
    Returns:
        A new list with the integers sorted in ascending order.
    """
    arr = nums[:]  # copy list to avoid modifying the original
    _quick_sort_recursive(arr, 0, len(arr) - 1)
    return arr

def _quick_sort_recursive(arr: List[int], low: int, high: int) -> None:
    if low < high:
        p = _partition(arr, low, high)
        _quick_sort_recursive(arr, low, p - 1)
        _quick_sort_recursive(arr, p + 1, high)

def _partition(arr: List[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low
    for j in range(low, high):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[high] = arr[high], arr[i]
    return i 