import { HashMap } from './exercise';

describe('HashMap', () => {
  it('should insert and retrieve values', () => {
    const hashMap = new HashMap<string, string>(16);
    hashMap.put('key1', 'value1');
    hashMap.put('key2', 'value2');
    expect(hashMap.get('key1')).toBe('value1');
    expect(hashMap.get('key2')).toBe('value2');
  });

  it('should return undefined for non-existent keys', () => {
    const hashMap = new HashMap<string, number>(16);
    expect(hashMap.get('nonExistentKey')).toBeUndefined();
  });

  it('should update values for existing keys', () => {
    const hashMap = new HashMap<string, number>(16);
    hashMap.put('key1', 1);
    hashMap.put('key1', 2);
    expect(hashMap.get('key1')).toBe(2);
  });

  it('should remove key-value pairs', () => {
    const hashMap = new HashMap<string, number>(16);
    hashMap.put('key1', 1);
    hashMap.remove('key1');
    expect(hashMap.get('key1')).toBeUndefined();
    expect(hashMap.size()).toBe(0);
  });

  it('should return the correct size', () => {
    const hashMap = new HashMap<string, number>(16);
    hashMap.put('key1', 1);
    hashMap.put('key2', 2);
    expect(hashMap.size()).toBe(2);
  });

  it('should return true if the hash map is empty, false otherwise', () => {
    const hashMap = new HashMap<string, number>(16);
    expect(hashMap.isEmpty()).toBe(true);
    hashMap.put('key1', 1);
    expect(hashMap.isEmpty()).toBe(false);
  });
});
