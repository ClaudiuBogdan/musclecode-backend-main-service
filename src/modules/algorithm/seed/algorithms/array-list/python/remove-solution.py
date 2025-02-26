from exercise import ArrayList

def remove(self, index: int) -> None:
    if 0 <= index < len(self.data):
        for i in range(index, len(self.data) - 1):
            self.data[i] = self.data[i + 1]
        self.data.pop()

ArrayList.remove = remove 