package twocrystalballs

import "math"

// TwoCrystalBalls determines the exact spot in which the crystal balls will break in the most optimized way.
// It returns the index where the balls start breaking, or -1 if they never break.
func TwoCrystalBalls(breaks []bool) int {
	n := len(breaks)
	jumpAmount := int(math.Sqrt(float64(n)))

	i := jumpAmount
	for ; i < n; i += jumpAmount {
		if breaks[i] {
			break
		}
	}

	i -= jumpAmount

	for j := i; j < n; j++ {
		if breaks[j] {
			return j
		}
	}

	return -1
} 