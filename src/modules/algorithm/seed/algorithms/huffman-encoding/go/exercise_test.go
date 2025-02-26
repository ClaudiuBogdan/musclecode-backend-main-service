package huffman

import (
	"reflect"
	"testing"
)

func TestHuffmanEncodingBasicFunctionality(t *testing.T) {
	characters := []rune{'a', 'b', 'c', 'd', 'e', 'f'}
	frequencies := []int{5, 2, 1, 1, 2, 4}
	expected := HuffmanCodeMap{
		'f': '0',
		'c': "100",
		'd': "101",
		'a': "1100",
		'b': "1101",
		'e': "111",
	}

	result := HuffmanEncoding(characters, frequencies)

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("HuffmanEncoding(%v, %v) = %v, want %v", characters, frequencies, result, expected)
	}
}

func TestHuffmanEncodingDifferentCharactersAndFrequencies(t *testing.T) {
	characters := []rune{'a', 'b', 'r', 'c', 'd'}
	frequencies := []int{5, 2, 2, 1, 1}
	expected := HuffmanCodeMap{
		'a': '0',
		'r': "10",
		'b': "111",
		'c': "1100",
		'd': "1101",
	}

	result := HuffmanEncoding(characters, frequencies)

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("HuffmanEncoding(%v, %v) = %v, want %v", characters, frequencies, result, expected)
	}
}

func TestHuffmanEncodingSingleCharacterInput(t *testing.T) {
	characters := []rune{'a'}
	frequencies := []int{1}
	expected := HuffmanCodeMap{
		'a': '0',
	}

	result := HuffmanEncoding(characters, frequencies)

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("HuffmanEncoding(%v, %v) = %v, want %v", characters, frequencies, result, expected)
	}
}

func TestHuffmanEncodingEmptyInputArrays(t *testing.T) {
	characters := []rune{}
	frequencies := []int{}
	expected := HuffmanCodeMap{}

	result := HuffmanEncoding(characters, frequencies)

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("HuffmanEncoding(%v, %v) = %v, want %v", characters, frequencies, result, expected)
	}
} 