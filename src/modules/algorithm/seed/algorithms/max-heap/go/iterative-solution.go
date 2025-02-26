package maxheap

type MaxHeap struct {
	heap []int
}

func NewMaxHeap(array []int) *MaxHeap {
	mh := &MaxHeap{heap: array}
	mh.buildMaxHeap()
	return mh
}

func (mh *MaxHeap) buildMaxHeap() {
	for i := len(mh.heap)/2 - 1; i >= 0; i-- {
		mh.heapify(i)
	}
}

func (mh *MaxHeap) heapify(i int) {
	largest := i
	left := 2*i + 1
	right := 2*i + 2

	if left < len(mh.heap) && mh.heap[left] > mh.heap[largest] {
		largest = left
	}

	if right < len(mh.heap) && mh.heap[right] > mh.heap[largest] {
		largest = right
	}

	if largest != i {
		mh.heap[i], mh.heap[largest] = mh.heap[largest], mh.heap[i]
		mh.heapify(largest)
	}
}

func (mh *MaxHeap) Insert(value int) {
	mh.heap = append(mh.heap, value)
	i := len(mh.heap) - 1
	for i > 0 && mh.heap[i] > mh.heap[(i-1)/2] {
		mh.heap[i], mh.heap[(i-1)/2] = mh.heap[(i-1)/2], mh.heap[i]
		i = (i - 1) / 2
	}
}

func (mh *MaxHeap) ExtractMax() int {
	if len(mh.heap) == 0 {
		return 0 // Or return an error
	}

	if len(mh.heap) == 1 {
		max := mh.heap[0]
		mh.heap = mh.heap[:0]
		return max
	}

	max := mh.heap[0]
	mh.heap[0] = mh.heap[len(mh.heap)-1]
	mh.heap = mh.heap[:len(mh.heap)-1]
	mh.heapify(0)
	return max
}

func (mh *MaxHeap) Peek() int {
	if len(mh.heap) == 0 {
		return 0 // Or return an error
	}
	return mh.heap[0]
}

func (mh *MaxHeap) Size() int {
	return len(mh.heap)
} 