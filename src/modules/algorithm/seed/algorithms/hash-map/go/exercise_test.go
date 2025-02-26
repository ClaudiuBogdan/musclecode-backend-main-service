package hashmap

import "testing"

func TestHashMap_PutAndGet(t *testing.T) {
	hashMap := NewHashMap(16)
	hashMap.Put("key1", "value1")
	hashMap.Put("key2", "value2")
	if hashMap.Get("key1") != "value1" {
		t.Errorf("Get(\"key1\") = %v, want \"value1\"", hashMap.Get("key1"))
	}
	if hashMap.Get("key2") != "value2" {
		t.Errorf("Get(\"key2\") = %v, want \"value2\"", hashMap.Get("key2"))
	}
}

func TestHashMap_GetNonExistentKey(t *testing.T) {
	hashMap := NewHashMap(16)
	if hashMap.Get("nonExistentKey") != nil {
		t.Errorf("Get(\"nonExistentKey\") = %v, want nil", hashMap.Get("nonExistentKey"))
	}
}

func TestHashMap_UpdateValue(t *testing.T) {
	hashMap := NewHashMap(16)
	hashMap.Put("key1", 1)
	hashMap.Put("key1", 2)
	if hashMap.Get("key1") != 2 {
		t.Errorf("Get(\"key1\") = %v, want 2", hashMap.Get("key1"))
	}
}

func TestHashMap_Remove(t *testing.T) {
	hashMap := NewHashMap(16)
	hashMap.Put("key1", 1)
	hashMap.Remove("key1")
	if hashMap.Get("key1") != nil {
		t.Errorf("Get(\"key1\") = %v, want nil", hashMap.Get("key1"))
	}
	if hashMap.Size() != 0 {
		t.Errorf("Size() = %v, want 0", hashMap.Size())
	}
}

func TestHashMap_Size(t *testing.T) {
	hashMap := NewHashMap(16)
	hashMap.Put("key1", 1)
	hashMap.Put("key2", 2)
	if hashMap.Size() != 2 {
		t.Errorf("Size() = %v, want 2", hashMap.Size())
	}
}

func TestHashMap_IsEmpty(t *testing.T) {
	hashMap := NewHashMap(16)
	if !hashMap.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want true", hashMap.IsEmpty())
	}
	hashMap.Put("key1", 1)
	if hashMap.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want false", hashMap.IsEmpty())
	}
} 