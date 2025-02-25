package bubblesort

// BubbleSortRecursive implements the Bubble Sort algorithm using a recursive approach.
func BubbleSortRecursive(nums []int) []int {
	n := len(nums)
	return bubbleSortRecursiveHelper(nums, n)
}

func bubbleSortRecursiveHelper(nums []int, n int) []int {
	if n == 1 {
		return nums
	}
	for i := 0; i < n-1; i++ {
		if nums[i] > nums[i+1] {
			nums[i], nums[i+1] = nums[i+1], nums[i]
		}
	}
	return bubbleSortRecursiveHelper(nums, n-1)
} 