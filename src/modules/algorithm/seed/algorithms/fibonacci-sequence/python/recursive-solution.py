from typing import List

def fibonacci_sequence(n: int) -> List[int]:
    """
    Generates the Fibonacci sequence using a recursive approach.
    
    Args:
        n: The number of Fibonacci numbers to generate.
    
    Returns:
        A list containing the Fibonacci sequence.
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]
    if n == 2:
        return [0, 1]
    
    sequence = fibonacci_sequence(n - 1)
    sequence.append(sequence[-1] + sequence[-2])
    return sequence 