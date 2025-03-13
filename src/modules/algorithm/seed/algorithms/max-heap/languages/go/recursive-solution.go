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
	n := len(mh.heap)
	for i := n/2 - 1; i >= 0; i-- {
		mh.heapify(mh.heap, n, i)
	}
}

func (mh *MaxHeap) heapify(array []int, n int, i int) {
	largest := i
	left := 2*i + 1
	right := 2*i + 2

	if left < n && array[left] > array[largest] {
		largest = left
	}

	if right < n && array[right] > array[largest] {
		largest = right
	}

	if largest != i {
		mh.swap(array, i, largest)
		mh.heapify(array, n, largest)
	}
}

func (mh *MaxHeap) Insert(value int) {
	mh.heap = append(mh.heap, value)
	mh.heapifyUp(mh.heap, len(mh.heap)-1)
}

func (mh *MaxHeap) heapifyUp(array []int, i int) {
	parent := (i - 1) / 2

	if i > 0 && array[i] > array[parent] {
		mh.swap(array, i, parent)
		mh.heapifyUp(array, parent)
	}
}

func (mh *MaxHeap) ExtractMax() int {
	if len(mh.heap) == 0 {
		return 0
	}

	if len(mh.heap) == 1 {
		max := mh.heap[0]
		mh.heap = mh.heap[:0]
		return max
	}

	max := mh.heap[0]
	mh.heap[0] = mh.heap[len(mh.heap)-1]
	mh.heap = mh.heap[:len(mh.heap)-1]
	mh.heapify(mh.heap, len(mh.heap), 0)
	return max
}

func (mh *MaxHeap) Peek() int {
	if len(mh.heap) == 0 {
		return 0
	}
	return mh.heap[0]
}

func (mh *MaxHeap) Size() int {
	return len(mh.heap)
}

func (mh *MaxHeap) swap(array []int, i int, j int) {
	array[i], array[j] = array[j], array[i]
} 