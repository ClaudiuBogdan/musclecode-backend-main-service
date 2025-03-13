import { DoublyLinkedList } from './exercise';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  it('should append elements to the end of the list', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.size).toBe(3);
  });

  it('should prepend elements to the beginning of the list', () => {
    list.prepend(1);
    list.prepend(2);
    expect(list.size).toBe(2);
  });

  it('should delete elements from the list', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.delete(2);
    expect(list.size).toBe(2);
  });

  it('should find an element in the list', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find(2)?.data).toBe(2);
  });

  it('should return null when element is not found', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find(4)).toBeNull();
  });
});
