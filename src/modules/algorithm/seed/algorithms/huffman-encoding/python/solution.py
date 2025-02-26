from typing import List, Dict
import heapq

class HuffmanNode:
    def __init__(self, char, frequency):
        self.char = char
        self.frequency = frequency
        self.left = None
        self.right = None

    # Define comparison based on frequency for heap operations
    def __lt__(self, other):
        return self.frequency < other.frequency

def huffman_encoding(characters: List[str], frequencies: List[int]) -> Dict[str, str]:
    """
    Encodes characters based on their frequencies using Huffman encoding.

    Args:
        characters: A list of characters.
        frequencies: A list of frequencies corresponding to each character.

    Returns:
        A dictionary mapping each character to its Huffman code.
    """
    if not characters:
        return {}

    nodes = [HuffmanNode(char, frequency) for char, frequency in zip(characters, frequencies)]
    heapq.heapify(nodes)

    while len(nodes) > 1:
        left = heapq.heappop(nodes)
        right = heapq.heappop(nodes)

        merged_node = HuffmanNode(None, left.frequency + right.frequency)
        merged_node.left = left
        merged_node.right = right

        heapq.heappush(nodes, merged_node)

    huffman_code_map = {}
    generate_huffman_codes(nodes[0], '', huffman_code_map)

    return huffman_code_map

def generate_huffman_codes(node: HuffmanNode, code: str, huffman_code_map: Dict[str, str]):
    if node.char is not None:
        huffman_code_map[node.char] = code or '0'  # Assign "0" for single character input
        return

    if node.left:
        generate_huffman_codes(node.left, code + '0', huffman_code_map)
    if node.right:
        generate_huffman_codes(node.right, code + '1', huffman_code_map) 