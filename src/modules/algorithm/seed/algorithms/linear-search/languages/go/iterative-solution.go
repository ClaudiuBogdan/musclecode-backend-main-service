package linearsearch

// LinearSearchIterative implements the linear search algorithm using an iterative approach.
// It returns the index of the target if found, or -1 otherwise.
func LinearSearchIterative(nums []int, target int) int {
    for i, v := range nums {
        if v == target {
            return i
        }
    }
    return -1
} 