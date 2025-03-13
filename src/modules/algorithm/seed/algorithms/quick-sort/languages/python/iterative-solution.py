from typing import List

def quick_sort(nums: List[int]) -> List[int]:
    """
    Implements Quick Sort algorithm using an iterative approach.
    
    Args:
        nums: A list of integers.
    
    Returns:
        A new list with the integers sorted in ascending order.
    """
    arr = nums[:]  # create a copy to avoid modifying the original list
    _quick_sort_iterative(arr)
    return arr

def _quick_sort_iterative(arr: List[int]) -> None:
    stack = [(0, len(arr) - 1)]
    while stack:
        low, high = stack.pop()
        if low < high:
            p = _partition(arr, low, high)
            stack.append((low, p - 1))
            stack.append((p + 1, high))

def _partition(arr: List[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low
    for j in range(low, high):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[high] = arr[high], arr[i]
    return i 