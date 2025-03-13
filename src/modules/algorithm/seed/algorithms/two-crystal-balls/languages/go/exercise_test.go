package twocrystalballs

import "testing"

func TestTwoCrystalBalls(t *testing.T) {
	testCases := []struct {
		name   string
		breaks []bool
		want   int
	}{
		{
			name:   "basic test",
			breaks: []bool{false, false, false, true, true, true},
			want:   3,
		},
		{
			name:   "no break",
			breaks: []bool{false, false, false, false, false},
			want:   -1,
		},
		{
			name: "large array",
			breaks: func() []bool {
				arr := make([]bool, 1000)
				for i := 500; i < 1000; i++ {
					arr[i] = true
				}
				return arr
			}(),
			want: 500,
		},
		{
			name:   "first floor breaks",
			breaks: []bool{true, true, true},
			want:   0,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := TwoCrystalBalls(tc.breaks)
			if got != tc.want {
				t.Errorf("TwoCrystalBalls(%v) = %v, want %v", tc.breaks, got, tc.want)
			}
		})
	}
} 