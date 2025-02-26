class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, value: int) -> None:
        self.heap.append(value)
        self.bubble_up(len(self.heap) - 1)

    def extract_min(self) -> int | None:
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self.sink_down(0)
        return min_val

    def peek(self) -> int | None:
        return self.heap[0] if self.heap else None

    def size(self) -> int:
        return len(self.heap)

    def bubble_up(self, index: int) -> None:
        while index > 0:
            parent_index = (index - 1) // 2
            if self.heap[index] < self.heap[parent_index]:
                self.swap(index, parent_index)
                index = parent_index
            else:
                break

    def sink_down(self, index: int) -> None:
        while True:
            smallest = index
            left_child_index = 2 * index + 1
            right_child_index = 2 * index + 2

            if left_child_index < len(self.heap) and self.heap[left_child_index] < self.heap[smallest]:
                smallest = left_child_index

            if right_child_index < len(self.heap) and self.heap[right_child_index] < self.heap[smallest]:
                smallest = right_child_index

            if smallest != index:
                self.swap(index, smallest)
                index = smallest
            else:
                break

    def swap(self, i: int, j: int) -> None:
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i] 