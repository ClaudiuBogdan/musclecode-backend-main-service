const { MaxHeap } = require('./exercise');

describe('MaxHeap', () => {
  it('should build a max heap from an array', () => {
    const heap = new MaxHeap([5, 3, 8, 4, 1, 9, 7]);
    expect(heap.peek()).toBe(9);
  });

  it('should insert a new value into the max heap', () => {
    const heap = new MaxHeap([5, 3, 8, 4, 1, 9, 7]);
    heap.insert(10);
    expect(heap.peek()).toBe(10);
  });

  it('should extract the maximum value from the max heap', () => {
    const heap = new MaxHeap([5, 3, 8, 4, 1, 9, 7]);
    expect(heap.extractMax()).toBe(9);
    expect(heap.peek()).toBe(8);
  });

  it('should return the maximum value without removing it', () => {
    const heap = new MaxHeap([5, 3, 8, 4, 1, 9, 7]);
    expect(heap.peek()).toBe(9);
  });

  it('should return the number of elements in the max heap', () => {
    const heap = new MaxHeap([5, 3, 8, 4, 1, 9, 7]);
    expect(heap.size()).toBe(7);
  });

  it('should handle an empty heap', () => {
    const heap = new MaxHeap([]);
    expect(heap.extractMax()).toBe(undefined);
    expect(heap.peek()).toBe(undefined);
    expect(heap.size()).toBe(0);
  });
});
