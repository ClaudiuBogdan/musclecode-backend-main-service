interface Job {
  id: string;
  profit: number;
  deadline: number;
}

/**
 * Implements the job sequencing algorithm to maximize profit.
 *
 * @param jobs - An array of jobs with their profit and deadline
 * @returns The sequence of job IDs that maximizes profit
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
export function jobSequencing(jobs: Job[]): string[] {
  // Sort jobs by profit in descending order
  jobs.sort((a, b) => b.profit - a.profit);

  // Find the maximum deadline
  let maxDeadline = 0;
  for (const job of jobs) {
    maxDeadline = Math.max(maxDeadline, job.deadline);
  }

  // Initialize an array to keep track of time slots
  const timeSlots: (string | null)[] = new Array(maxDeadline).fill(null);
  const result: string[] = [];

  // Iterate through the sorted jobs and schedule them
  for (const job of jobs) {
    // Find the latest available slot for the job
    for (let i = job.deadline - 1; i >= 0; i--) {
      if (timeSlots[i] === null) {
        timeSlots[i] = job.id;
        result.push(job.id);
        break;
      }
    }
  }

  return result;
}
