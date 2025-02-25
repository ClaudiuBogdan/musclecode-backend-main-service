from typing import List

def merge(left: List[int], right: List[int]) -> List[int]:
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

def merge_sort(nums: List[int]) -> List[int]:
    """
    Bottom-up iterative merge sort.
    """
    if not nums:
        return []
    # Start with a list of single-element lists.
    work = [[num] for num in nums]
    while len(work) > 1:
        temp = []
        for i in range(0, len(work), 2):
            if i + 1 < len(work):
                temp.append(merge(work[i], work[i + 1]))
            else:
                temp.append(work[i])
        work = temp
    return work[0] 