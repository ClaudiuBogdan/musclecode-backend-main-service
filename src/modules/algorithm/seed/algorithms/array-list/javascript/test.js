const { ArrayList } = require('./exercise');

describe('ArrayList', () => {
  it('should add elements to the end of the list', () => {
    const list = new ArrayList();
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  it('should remove elements from the specified index', () => {
    const list = new ArrayList();
    list.add('apple');
    list.add('banana');
    list.add('orange');
    list.remove(1);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe('apple');
    expect(list.get(1)).toBe('orange');
    expect(list.get(2)).toBe(undefined);
  });

  it('should handle removing elements from an empty list', () => {
    const list = new ArrayList();
    list.remove(0);
    expect(list.size()).toBe(0);
  });

  it('should handle removing elements from the beginning and end of the list', () => {
    const list = new ArrayList();
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(0);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(2);
    expect(list.get(1)).toBe(3);

    list.remove(1);
    expect(list.size()).toBe(1);
    expect(list.get(0)).toBe(2);
  });
});
