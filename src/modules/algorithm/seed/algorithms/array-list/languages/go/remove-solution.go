package arraylist

// Remove removes the element at the specified index.
func (list *ArrayList) Remove(index int) {
	if index >= 0 && index < list.Size() {
		list.data = append(list.data[:index], list.data[index+1:]...)
	}
} 