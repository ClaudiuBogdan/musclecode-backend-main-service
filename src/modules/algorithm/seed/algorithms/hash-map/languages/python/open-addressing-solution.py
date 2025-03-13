class HashMap:
    def __init__(self, capacity: int = 16):
        self.capacity = capacity
        self.size = 0
        self.keys = [None] * capacity
        self.values = [None] * capacity

    def _hash(self, key):
        if isinstance(key, int):
            return key % self.capacity
        key_string = str(key)
        hash_value = 0
        for i in range(len(key_string)):
            hash_value = (hash_value * 31 + ord(key_string[i])) % self.capacity
        return hash_value

    def put(self, key, value):
        index = self._hash(key)
        initial_index = index

        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value
                return
            index = (index + 1) % self.capacity
            if index == initial_index:
                raise Exception("HashMap is full")

        self.keys[index] = key
        self.values[index] = value
        self.size += 1

    def get(self, key):
        index = self._hash(key)
        initial_index = index

        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.capacity
            if index == initial_index:
                return None

        return None

    def remove(self, key):
        index = self._hash(key)
        initial_index = index

        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.keys[index] = None
                self.values[index] = None
                self.size -= 1
                return
            index = (index + 1) % self.capacity
            if index == initial_index:
                return

    def size(self):
        return self.size

    def is_empty(self):
        return self.size == 0 