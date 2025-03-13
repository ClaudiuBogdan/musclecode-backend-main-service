class HashMapNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashMap:
    def __init__(self, capacity: int = 16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity

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
        node = self.buckets[index]

        while node:
            if node.key == key:
                node.value = value
                return
            if node.next is None:
                break
            node = node.next

        new_node = HashMapNode(key, value)
        if self.buckets[index] is None:
            self.buckets[index] = new_node
        else:
            new_node.next = self.buckets[index]
            self.buckets[index] = new_node
        self.size += 1

    def get(self, key):
        index = self._hash(key)
        node = self.buckets[index]

        while node:
            if node.key == key:
                return node.value
            node = node.next

        return None

    def remove(self, key):
        index = self._hash(key)
        node = self.buckets[index]
        prev = None

        while node:
            if node.key == key:
                if prev is None:
                    self.buckets[index] = node.next
                else:
                    prev.next = node.next
                self.size -= 1
                return
            prev = node
            node = node.next

    def size(self):
        return self.size

    def is_empty(self):
        return self.size == 0 