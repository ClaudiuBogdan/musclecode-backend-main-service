from typing import List
import math

def two_crystal_balls(breaks: List[bool]) -> int:
    """
    Given two crystal balls that will break if dropped from high enough distance,
    determine the exact spot in which they will break in the most optimized way.

    Args:
        breaks (List[bool]): An array of booleans representing whether the ball breaks at that floor.

    Returns:
        int: The index where the balls start breaking, or -1 if they never break.
    """
    n = len(breaks)
    jump_amount = int(math.sqrt(n))

    i = jump_amount
    while i < n:
        if breaks[i]:
            break
        i += jump_amount

    i -= jump_amount

    for j in range(i, n):
        if breaks[j]:
            return j

    return -1 