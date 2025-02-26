class HuffmanNode {
  constructor(char, frequency, left = null, right = null) {
    this.char = char;
    this.frequency = frequency;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {string[]} characters - An array of characters
 * @param {number[]} frequencies - An array of frequencies corresponding to each character
 * @returns {object} - A map of characters to their Huffman codes
 */
function huffmanEncoding(characters, frequencies) {
  if (!characters || characters.length === 0) {
    return {};
  }

  const nodes = characters.map(
    (char, i) => new HuffmanNode(char, frequencies[i]),
  );

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);

    const left = nodes.shift();
    const right = nodes.shift();

    const mergedNode = new HuffmanNode(
      null,
      left.frequency + right.frequency,
      left,
      right,
    );

    nodes.push(mergedNode);
  }

  const huffmanCodeMap = {};
  generateHuffmanCodes(nodes[0], '', huffmanCodeMap);

  return huffmanCodeMap;
}

function generateHuffmanCodes(node, code, huffmanCodeMap) {
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

module.exports = { huffmanEncoding };
