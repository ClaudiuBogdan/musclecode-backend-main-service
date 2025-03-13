import { RingBuffer } from './exercise';

describe('RingBuffer', () => {
  it('should enqueue and dequeue elements correctly', () => {
    const buffer = new RingBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    expect(buffer.dequeue()).toBe(1);
    expect(buffer.dequeue()).toBe(2);
    expect(buffer.dequeue()).toBe(3);
    expect(buffer.dequeue()).toBe(undefined);
  });

  it('should overwrite elements when the buffer is full', () => {
    const buffer = new RingBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    buffer.enqueue(4);
    expect(buffer.dequeue()).toBe(2);
    expect(buffer.dequeue()).toBe(3);
    expect(buffer.dequeue()).toBe(4);
  });

  it('should handle enqueue and dequeue operations after overwrite', () => {
    const buffer = new RingBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    buffer.enqueue(4);
    expect(buffer.dequeue()).toBe(2);
    buffer.enqueue(5);
    expect(buffer.dequeue()).toBe(3);
    expect(buffer.dequeue()).toBe(4);
    expect(buffer.dequeue()).toBe(5);
    expect(buffer.isEmpty()).toBe(true);
  });

  it('should report correct counts and empty/full status', () => {
    const buffer = new RingBuffer<number>(3);
    expect(buffer.isEmpty()).toBe(true);
    expect(buffer.isFull()).toBe(false);
    buffer.enqueue(1);
    expect(buffer.getCount()).toBe(1);
    expect(buffer.isEmpty()).toBe(false);
    expect(buffer.isFull()).toBe(false);
    buffer.enqueue(2);
    buffer.enqueue(3);
    expect(buffer.isFull()).toBe(true);
    buffer.dequeue();
    expect(buffer.isFull()).toBe(false);
    expect(buffer.getCount()).toBe(2);
  });
});
