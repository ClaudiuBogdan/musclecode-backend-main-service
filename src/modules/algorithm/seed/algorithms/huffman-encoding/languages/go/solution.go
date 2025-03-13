package huffman

import (
	"container/heap"
)

// HuffmanCodeMap represents the mapping between characters and their Huffman codes.
type HuffmanCodeMap map[rune]string

// huffmanNode represents a node in the Huffman tree.
type huffmanNode struct {
	char      rune
	frequency int
	left      *huffmanNode
	right     *huffmanNode
}

// priorityQueue is a min-heap of huffmanNodes.
type priorityQueue []*huffmanNode

func (pq priorityQueue) Len() int { return len(pq) }
func (pq priorityQueue) Less(i, j int) bool {
	return pq[i].frequency < pq[j].frequency
}
func (pq priorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
}

func (pq *priorityQueue) Push(x interface{}) {
	node := x.(*huffmanNode)
	*pq = append(*pq, node)
}

func (pq *priorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	node := old[n-1]
	*pq = old[0 : n-1]
	return node
}

// HuffmanEncoding encodes characters based on their frequencies using Huffman encoding.
// It returns a map of characters to their Huffman codes.
func HuffmanEncoding(characters []rune, frequencies []int) HuffmanCodeMap {
	if len(characters) == 0 {
		return make(HuffmanCodeMap)
	}

	// Create a priority queue of Huffman nodes
	pq := make(priorityQueue, len(characters))
	for i := 0; i < len(characters); i++ {
		pq[i] = &huffmanNode{
			char:      characters[i],
			frequency: frequencies[i],
		}
	}
	heap.Init(&pq)

	// Build the Huffman tree
	for pq.Len() > 1 {
		left := heap.Pop(&pq).(*huffmanNode)
		right := heap.Pop(&pq).(*huffmanNode)

		mergedNode := &huffmanNode{
			frequency: left.frequency + right.frequency,
			left:      left,
			right:     right,
		}
		heap.Push(&pq, mergedNode)
	}

	// Generate Huffman codes from the Huffman tree
	huffmanCodeMap := make(HuffmanCodeMap)
	generateHuffmanCodes(pq[0], "", huffmanCodeMap)

	return huffmanCodeMap
}

// generateHuffmanCodes recursively traverses the Huffman tree and generates the Huffman codes.
func generateHuffmanCodes(node *huffmanNode, code string, huffmanCodeMap HuffmanCodeMap) {
	if node == nil {
		return
	}

	if node.char != 0 {
		huffmanCodeMap[node.char] = code
		return
	}

	generateHuffmanCodes(node.left, code+"0", huffmanCodeMap)
	generateHuffmanCodes(node.right, code+"1", huffmanCodeMap)
} 