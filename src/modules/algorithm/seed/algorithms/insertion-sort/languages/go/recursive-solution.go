package insertionsort

// InsertionSortRecursive implements the insertion sort algorithm using a recursive approach.
// It sorts the slice in-place and returns the sorted slice.
func InsertionSortRecursive(nums []int) []int {
    recursiveInsertionSort(nums, len(nums))
    return nums
}

func recursiveInsertionSort(nums []int, n int) {
    if n <= 1 {
        return
    }
    recursiveInsertionSort(nums, n-1)
    key := nums[n-1]
    j := n - 2
    for j >= 0 && nums[j] > key {
        nums[j+1] = nums[j]
        j--
    }
    nums[j+1] = key
} 