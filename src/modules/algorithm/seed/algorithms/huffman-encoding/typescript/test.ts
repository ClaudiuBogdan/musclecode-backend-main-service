import { huffmanEncoding } from './exercise';

describe('Huffman Encoding Algorithm', () => {
  it('should encode characters based on their frequencies', () => {
    const characters = ['a', 'b', 'c', 'd', 'e', 'f'];
    const frequencies = [5, 2, 1, 1, 2, 4];
    const result = huffmanEncoding(characters, frequencies);
    expect(result).toEqual({
      f: '0',
      c: '100',
      d: '101',
      a: '1100',
      b: '1101',
      e: '111',
    });
  });

  it('should handle different characters and frequencies', () => {
    const characters = ['a', 'b', 'r', 'c', 'd'];
    const frequencies = [5, 2, 2, 1, 1];
    const result = huffmanEncoding(characters, frequencies);
    expect(result).toEqual({ a: '0', r: '10', b: '111', c: '1100', d: '1101' });
  });

  it('should handle single character input', () => {
    const characters = ['a'];
    const frequencies = [1];
    const result = huffmanEncoding(characters, frequencies);
    expect(result).toEqual({ a: '0' });
  });

  it('should handle empty input arrays', () => {
    const characters: string[] = [];
    const frequencies: number[] = [];
    const result = huffmanEncoding(characters, frequencies);
    expect(result).toEqual({});
  });
});
