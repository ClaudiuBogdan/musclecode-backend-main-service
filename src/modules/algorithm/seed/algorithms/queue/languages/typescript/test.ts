import { Queue } from './exercise';

describe('Queue', () => {
  it('should enqueue elements to the queue', () => {
    const queue = new Queue(5);
    queue.enqueue(10);
    expect(queue.peek()).toBe(10);
  });

  it('should dequeue elements from the queue', () => {
    const queue = new Queue(5);
    queue.enqueue(10);
    expect(queue.dequeue()).toBe(10);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should peek at the front element of the queue', () => {
    const queue = new Queue(5);
    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.peek()).toBe(10);
  });

  it('should check if the queue is empty', () => {
    const queue = new Queue(5);
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(10);
    expect(queue.isEmpty()).toBe(false);
  });

  it('should check if the queue is full', () => {
    const queue = new Queue(2);
    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.isFull()).toBe(true);
  });

  it('should return undefined when peeking an empty queue', () => {
    const queue = new Queue(5);
    expect(queue.peek()).toBeUndefined();
  });

  it('should return undefined when dequeueing an empty queue', () => {
    const queue = new Queue(5);
    expect(queue.dequeue()).toBeUndefined();
  });

  it('should handle enqueue and dequeue operations', () => {
    const queue = new Queue(3);
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(3);
    expect(queue.isFull()).toBe(true);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });
});
