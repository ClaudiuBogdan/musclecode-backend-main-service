package quicksort

// QuickSortRecursive implements the Quick Sort algorithm using a recursive approach.
// It returns a new sorted slice.
func QuickSortRecursive(nums []int) []int {
    // Create a copy of nums to avoid modifying the original slice
    arr := make([]int, len(nums))
    copy(arr, nums)
    quickSortRecursive(arr, 0, len(arr)-1)
    return arr
}

func quickSortRecursive(arr []int, low, high int) {
    if low < high {
        p := partition(arr, low, high)
        quickSortRecursive(arr, low, p-1)
        quickSortRecursive(arr, p+1, high)
    }
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