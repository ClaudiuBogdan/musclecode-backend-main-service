import { MinHeap } from './exercise';

describe('MinHeap', () => {
  let minHeap: MinHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  it('should insert elements into the min heap', () => {
    minHeap.insert(5);
    minHeap.insert(3);
    minHeap.insert(7);
    expect(minHeap.size()).toBe(3);
  });

  it('should extract the minimum element', () => {
    minHeap.insert(5);
    minHeap.insert(3);
    minHeap.insert(7);
    expect(minHeap.extractMin()).toBe(3);
    expect(minHeap.size()).toBe(2);
  });

  it('should peek at the minimum element without extracting', () => {
    minHeap.insert(5);
    minHeap.insert(3);
    minHeap.insert(7);
    expect(minHeap.peek()).toBe(3);
    expect(minHeap.size()).toBe(3);
  });

  it('should return undefined when extracting from an empty heap', () => {
    expect(minHeap.extractMin()).toBeUndefined();
  });

  it('should return undefined when peeking at an empty heap', () => {
    expect(minHeap.peek()).toBeUndefined();
  });
});
