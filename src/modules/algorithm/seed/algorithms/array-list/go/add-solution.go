package arraylist

// Add adds an element to the end of the list.
func (list *ArrayList) Add(element interface{}) {
	list.data = append(list.data, element)
} 