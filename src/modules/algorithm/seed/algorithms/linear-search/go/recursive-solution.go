package linearsearch

// LinearSearchRecursive implements the linear search algorithm using a recursive approach.
// It returns the index of the target if found, or -1 otherwise.
func LinearSearchRecursive(nums []int, target int) int {
    return linearSearchRecursiveHelper(nums, target, 0)
}

func linearSearchRecursiveHelper(nums []int, target int, index int) int {
    if index >= len(nums) {
        return -1
    }
    if nums[index] == target {
        return index
    }
    return linearSearchRecursiveHelper(nums, target, index+1)
} 