package bubblesort

// BubbleSortIterative implements the Bubble Sort algorithm using an iterative approach.
func BubbleSortIterative(nums []int) []int {
	n := len(nums)
	for i := 0; i < n; i++ {
		swapped := false
		for j := 0; j < n-i-1; j++ {
			if nums[j] > nums[j+1] {
				// Swap adjacent elements
				nums[j], nums[j+1] = nums[j+1], nums[j]
				swapped = true
			}
		}
		if !swapped {
			break
		}
	}
	return nums
} 