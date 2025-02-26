package maxsubarray

// MaxSubarraySum finds the maximum sum of a contiguous subarray of size k using sliding window.
func MaxSubarraySum(nums []int, k int) int {
	if len(nums) < k || k <= 0 {
		return 0 // Or return an error value
	}

	maxSum := 0
	windowSum := 0

	// Calculate the sum of the first window
	for i := 0; i < k; i++ {
		windowSum += nums[i]
	}
	maxSum = windowSum

	// Slide the window and update maxSum
	for i := k; i < len(nums); i++ {
		windowSum = windowSum - nums[i-k] + nums[i]
		if windowSum > maxSum {
			maxSum = windowSum
		}
	}

	return maxSum
} 