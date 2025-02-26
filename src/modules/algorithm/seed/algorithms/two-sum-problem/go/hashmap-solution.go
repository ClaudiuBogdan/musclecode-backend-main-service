package twosum

// TwoSum finds two numbers in nums that add up to target and returns their indices.
// It assumes that each input would have exactly one solution, and you may not use the same element twice.
func TwoSum(nums []int, target int) []int {
	numMap := make(map[int]int)

	for i, num := range nums {
		complement := target - num
		if j, ok := numMap[complement]; ok {
			return []int{j, i}
		}
		numMap[num] = i
	}

	return nil
} 