package minheap

// MinHeap represents a min heap data structure.
type MinHeap struct {
	heap []int
}

// NewMinHeap creates a new MinHeap.
func NewMinHeap() *MinHeap {
	return &MinHeap{heap: []int{}}
}

// Insert inserts a value into the min heap.
func (mh *MinHeap) Insert(value int) {
	mh.heap = append(mh.heap, value)
	mh.bubbleUp(len(mh.heap) - 1)
}

// ExtractMin extracts the minimum value from the min heap.
func (mh *MinHeap) ExtractMin() (int, bool) {
	if len(mh.heap) == 0 {
		return 0, false
	}
	if len(mh.heap) == 1 {
		min := mh.heap[0]
		mh.heap = []int{}
		return min, true
	}
	min := mh.heap[0]
	mh.heap[0] = mh.heap[len(mh.heap)-1]
	mh.heap = mh.heap[:len(mh.heap)-1]
	mh.sinkDown(0)
	return min, true
}

// Peek returns the minimum value from the min heap without removing it.
func (mh *MinHeap) Peek() (int, bool) {
	if len(mh.heap) == 0 {
		return 0, false
	}
	return mh.heap[0], true
}

// Size returns the number of elements in the min heap.
func (mh *MinHeap) Size() int {
	return len(mh.heap)
}

func (mh *MinHeap) bubbleUp(index int) {
	if index <= 0 {
		return
	}
	parentIndex := (index - 1) / 2
	if mh.heap[index] < mh.heap[parentIndex] {
		mh.swap(index, parentIndex)
		mh.bubbleUp(parentIndex)
	}
}

func (mh *MinHeap) sinkDown(index int) {
	leftChildIndex := 2*index + 1
	rightChildIndex := 2*index + 2
	smallest := index

	if leftChildIndex < len(mh.heap) && mh.heap[leftChildIndex] < mh.heap[smallest] {
		smallest = leftChildIndex
	}

	if rightChildIndex < len(mh.heap) && mh.heap[rightChildIndex] < mh.heap[smallest] {
		smallest = rightChildIndex
	}

	if smallest != index {
		mh.swap(index, smallest)
		mh.sinkDown(smallest)
	}
}

func (mh *MinHeap) swap(i, j int) {
	mh.heap[i], mh.heap[j] = mh.heap[j], mh.heap[i]
} 