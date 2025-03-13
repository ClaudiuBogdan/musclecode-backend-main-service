package mergesort

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

// MergeSort iteratively sorts the slice using a bottom-up merge sort approach.
func MergeSort(nums []int) []int {
	if len(nums) <= 1 {
		return nums
	}

	// Create a slice of slices, each containing one element.
	work := make([][]int, len(nums))
	for i, v := range nums {
		work[i] = []int{v}
	}

	// Iteratively merge adjacent slices.
	for len(work) > 1 {
		var temp [][]int
		for i := 0; i < len(work); i += 2 {
			if i+1 < len(work) {
				temp = append(temp, merge(work[i], work[i+1]))
			} else {
				temp = append(temp, work[i])
			}
		}
		work = temp
	}
	return work[0]
} 