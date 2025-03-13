package twosum

// TwoSum finds two numbers in nums that add up to target and returns their indices.
// It assumes that each input would have exactly one solution, and you may not use the same element twice.
func TwoSum(nums []int, target int) []int {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return nil
} 