package knapsackfractional

import "sort"

// FractionalKnapsack implements the fractional knapsack algorithm using a greedy approach.
func FractionalKnapsack(weights []float64, values []float64, capacity float64) float64 {
	n := len(weights)
	if n == 0 {
		return 0
	}

	// Create items array with value-to-weight ratio
	items := make([]struct {
		index int
		ratio float64
	}, n)
	for i := range weights {
		items[i].index = i
		items[i].ratio = values[i] / weights[i]
	}

	// Sort items by value-to-weight ratio in descending order
	sort.Slice(items, func(i, j int) bool {
		return items[i].ratio > items[j].ratio
	})

	totalValue := 0.0
	remainingCapacity := capacity

	for _, item := range items {
		weight := weights[item.index]
		value := values[item.index]

		if remainingCapacity >= weight {
			// Take the whole item
			totalValue += value
			remainingCapacity -= weight
		} else {
			// Take a fraction of the item
			fraction := remainingCapacity / weight
			totalValue += value * fraction
			break // Knapsack is full
		}
	}

	return totalValue
} 