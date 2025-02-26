import { SinglyLinkedList, Node } from './exercise';

describe('Singly Linked List', () => {
  let list: SinglyLinkedList;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  it('should insert at the beginning', () => {
    list.insertAtBeginning(10);
    expect(list.head?.data).toBe(10);
  });

  it('should insert at the end', () => {
    list.insertAtEnd(20);
    expect(list.head?.data).toBe(20);
    list.insertAtEnd(30);
    expect(list.head?.next?.data).toBe(30);
  });

  it('should delete a node', () => {
    list.insertAtEnd(10);
    list.insertAtEnd(20);
    list.delete(10);
    expect(list.head?.data).toBe(20);
  });

  it('should search for a node', () => {
    list.insertAtEnd(10);
    list.insertAtEnd(20);
    const node = list.search(20);
    expect(node?.data).toBe(20);
  });

  it('should display the list', () => {
    list.insertAtEnd(10);
    list.insertAtEnd(20);
    const consoleSpy = jest.spyOn(console, 'log');
    list.display();
    expect(consoleSpy).toHaveBeenCalledWith('10 -> 20 -> null');
    consoleSpy.mockRestore();
  });
});
