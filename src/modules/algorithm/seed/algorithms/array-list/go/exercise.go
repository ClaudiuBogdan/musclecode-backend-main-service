package arraylist

// ArrayList is a simple implementation of a dynamic array.
type ArrayList struct {
	data []interface{}
}

// NewArrayList creates a new ArrayList.
func NewArrayList() *ArrayList {
	return &ArrayList{data: make([]interface{}, 0)}
}

// Add adds an element to the end of the list.
func (list *ArrayList) Add(element interface{}) {
	// TODO: Implement the Add method
}

// Remove removes the element at the specified index.
func (list *ArrayList) Remove(index int) {
	// TODO: Implement the Remove method
}

// Get returns the element at the specified index.
func (list *ArrayList) Get(index int) interface{} {
	return list.data[index]
}

// Size returns the number of elements in the list.
func (list *ArrayList) Size() int {
	return len(list.data)
} 