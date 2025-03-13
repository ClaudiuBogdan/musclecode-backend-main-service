class MaxHeap:
    def __init__(self, array):
        self.heap = array
        self.build_max_heap()

    def build_max_heap(self):
        for i in range(len(self.heap) // 2 - 1, -1, -1):
            self.heapify(i)

    def heapify(self, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < len(self.heap) and self.heap[left] > self.heap[largest]:
            largest = left

        if right < len(self.heap) and self.heap[right] > self.heap[largest]:
            largest = right

        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self.heapify(largest)

    def insert(self, value):
        self.heap.append(value)
        i = len(self.heap) - 1
        while i > 0 and self.heap[i] > self.heap[(i - 1) // 2]:
            self.heap[i], self.heap[(i - 1) // 2] = self.heap[(i - 1) // 2], self.heap[i]
            i = (i - 1) // 2

    def extract_max(self):
        if not self.heap:
            return None

        if len(self.heap) == 1:
            return self.heap.pop()

        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self.heapify(0)
        return max_val

    def peek(self):
        return self.heap[0] if self.heap else None

    def size(self):
        return len(self.heap) 