interface FrequencyMap {
  [char: string]: number;
}

interface HuffmanCodeMap {
  [char: string]: string;
}

class HuffmanNode {
  char: string | null;
  frequency: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;

  constructor(
    char: string | null,
    frequency: number,
    left: HuffmanNode | null = null,
    right: HuffmanNode | null = null,
  ) {
    this.char = char;
    this.frequency = frequency;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {string[]} characters - An array of characters
 * @param {number[]} frequencies - An array of frequencies corresponding to each character
 * @returns {HuffmanCodeMap} - A map of characters to their Huffman codes
 */
export function huffmanEncoding(
  characters: string[],
  frequencies: number[],
): HuffmanCodeMap {
  if (!characters || characters.length === 0) {
    return {};
  }

  const nodes: HuffmanNode[] = characters.map(
    (char, i) => new HuffmanNode(char, frequencies[i]),
  );

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);

    const left = nodes.shift()!;
    const right = nodes.shift()!;

    const mergedNode = new HuffmanNode(
      null,
      left.frequency + right.frequency,
      left,
      right,
    );

    nodes.push(mergedNode);
  }

  const huffmanCodeMap: HuffmanCodeMap = {};
  generateHuffmanCodes(nodes[0], '', huffmanCodeMap);

  return huffmanCodeMap;
}

function generateHuffmanCodes(
  node: HuffmanNode,
  code: string,
  huffmanCodeMap: HuffmanCodeMap,
): void {
  if (node.char !== null) {
    huffmanCodeMap[node.char] = code || '0'; // Assign "0" for single character input
    return;
  }

  if (node.left) {
    generateHuffmanCodes(node.left, code + '0', huffmanCodeMap);
  }
  if (node.right) {
    generateHuffmanCodes(node.right, code + '1', huffmanCodeMap);
  }
}
