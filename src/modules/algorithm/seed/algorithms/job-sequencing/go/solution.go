package jobsequencing

import "sort"

// Job represents a job with its ID, profit, and deadline.
type Job struct {
	ID     string
	Profit int
	Deadline int
}

// JobSequencing finds the optimal sequence of jobs to maximize profit.
func JobSequencing(jobs []Job) []string {
	// Sort jobs by profit in descending order
	sort.Slice(jobs, func(i, j int) bool {
		return jobs[i].Profit > jobs[j].Profit
	})

	// Find the maximum deadline
	maxDeadline := 0
	for _, job := range jobs {
		if job.Deadline > maxDeadline {
			maxDeadline = job.Deadline
		}
	}

	// Initialize an array to keep track of time slots
	timeSlots := make([]string, maxDeadline)
	result := []string{}

	// Iterate through the sorted jobs and schedule them
	for _, job := range jobs {
		// Find the latest available slot for the job
		for i := job.Deadline - 1; i >= 0; i-- {
			if timeSlots[i] == "" {
				timeSlots[i] = job.ID
				result = append(result, job.ID)
				break
			}
		}
	}

	return result
} 