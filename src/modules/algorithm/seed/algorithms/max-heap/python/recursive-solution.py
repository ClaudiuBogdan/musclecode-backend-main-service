class MaxHeap:
    def __init__(self, array):
        self.heap = array
        self.build_max_heap(self.heap)

    def build_max_heap(self, array):
        n = len(array)
        for i in range(n // 2 - 1, -1, -1):
            self.heapify(array, n, i)

    def heapify(self, array, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and array[left] > array[largest]:
            largest = left

        if right < n and array[right] > array[largest]:
            largest = right

        if largest != i:
            self.swap(array, i, largest)
            self.heapify(array, n, largest)

    def insert(self, value):
        self.heap.append(value)
        self.heapify_up(self.heap, len(self.heap) - 1)

    def heapify_up(self, array, i):
        parent = (i - 1) // 2

        if i > 0 and array[i] > array[parent]:
            self.swap(array, i, parent)
            self.heapify_up(array, parent)

    def extract_max(self):
        if not self.heap:
            return None

        if len(self.heap) == 1:
            return self.heap.pop()

        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self.heapify(self.heap, len(self.heap), 0)
        return max_val

    def peek(self):
        return self.heap[0] if self.heap else None

    def size(self):
        return len(self.heap)

    def swap(self, array, i, j):
        array[i], array[j] = array[j], array[i] 