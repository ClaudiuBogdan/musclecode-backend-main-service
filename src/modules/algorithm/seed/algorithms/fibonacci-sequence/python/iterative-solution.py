from typing import List

def fibonacci_sequence(n: int) -> List[int]:
    """
    Generates the Fibonacci sequence using an iterative approach.
    
    Args:
        n: The number of Fibonacci numbers to generate.
    
    Returns:
        A list containing the Fibonacci sequence.
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence 