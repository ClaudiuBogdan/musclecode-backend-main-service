import { StackImpl } from './exercise';

describe('Stack Data Structure', () => {
  let stack: StackImpl;

  beforeEach(() => {
    stack = new StackImpl();
  });

  it('should push elements onto the stack', () => {
    stack.push(10);
    stack.push(20);
    expect(stack.peek()).toBe(20);
  });

  it('should pop elements from the stack', () => {
    stack.push(10);
    stack.push(20);
    expect(stack.pop()).toBe(20);
    expect(stack.pop()).toBe(10);
    expect(stack.pop()).toBeUndefined();
  });

  it('should peek at the top element of the stack', () => {
    stack.push(10);
    expect(stack.peek()).toBe(10);
    stack.push(20);
    expect(stack.peek()).toBe(20);
  });

  it('should check if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(10);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });

  it('should handle popping from an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });

  it('should handle peeking at an empty stack', () => {
    expect(stack.peek()).toBeUndefined();
  });
});
