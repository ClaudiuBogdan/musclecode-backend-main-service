from typing import List, Dict

def job_sequencing(jobs: List[Dict]) -> List[str]:
    """
    Implements the job sequencing algorithm to maximize profit.

    Args:
        jobs: A list of dictionaries, where each dictionary represents a job
              and has 'id', 'profit', and 'deadline' keys.

    Returns:
        A list of job IDs representing the optimal sequence.

    Time Complexity: O(n^2)
    Space Complexity: O(n)
    """
    # Sort jobs by profit in descending order
    jobs.sort(key=lambda x: x['profit'], reverse=True)

    # Find the maximum deadline
    max_deadline = max(job['deadline'] for job in jobs) if jobs else 0

    # Initialize an array to keep track of time slots
    time_slots = [None] * max_deadline
    result = []

    # Iterate through the sorted jobs and schedule them
    for job in jobs:
        # Find the latest available slot for the job
        for i in range(job['deadline'] - 1, -1, -1):
            if time_slots[i] is None:
                time_slots[i] = job['id']
                result.append(job['id'])
                break

    return result 