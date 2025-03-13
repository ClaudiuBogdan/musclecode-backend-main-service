from typing import List

def fractional_knapsack(weights: List[float], values: List[float], capacity: float) -> float:
    """
    Implements the fractional knapsack algorithm using a greedy approach.

    Args:
        weights (List[float]): A list of item weights.
        values (List[float]): A list of item values.
        capacity (float): The knapsack capacity.

    Returns:
        float: The maximum value that can be carried in the knapsack.

    Time Complexity: O(n log n) due to sorting
    """
    n = len(weights)
    if n == 0:
        return 0.0

    # Calculate value-to-weight ratio for each item
    items = [(values[i] / weights[i], weights[i], values[i]) for i in range(n)]

    # Sort items by value-to-weight ratio in descending order
    items.sort(reverse=True)

    total_value = 0.0
    remaining_capacity = capacity

    for ratio, weight, value in items:
        if remaining_capacity >= weight:
            # Take the whole item
            total_value += value
            remaining_capacity -= weight
        else:
            # Take a fraction of the item
            fraction = remaining_capacity / weight
            total_value += value * fraction
            break  # Knapsack is full

    return total_value 