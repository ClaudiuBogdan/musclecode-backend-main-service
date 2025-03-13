package quicksort

// QuickSortIterative implements the Quick Sort algorithm using an iterative approach.
// It returns a new sorted slice.
func QuickSortIterative(nums []int) []int {
    // Create a copy of nums to avoid modifying the original slice
    arr := make([]int, len(nums))
    copy(arr, nums)
    stack := [][2]int{{0, len(arr) - 1}}

    for len(stack) > 0 {
        // Pop the last element from the stack
        lowHigh := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        low, high := lowHigh[0], lowHigh[1]

        if low < high {
            p := partition(arr, low, high)
            stack = append(stack, [2]int{low, p - 1})
            stack = append(stack, [2]int{p + 1, high})
        }
    }
    return arr
}

func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low
    for j := low; j < high; j++ {
        if arr[j] < pivot {
            arr[i], arr[j] = arr[j], arr[i]
            i++
        }
    }
    arr[i], arr[high] = arr[high], arr[i]
    return i
} 