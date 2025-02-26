package lrucache

import "testing"

func TestLRUCache(t *testing.T) {
	lRUCache := Constructor(2)
	lRUCache.Put(1, 1)
	lRUCache.Put(2, 2)
	if lRUCache.Get(1) != 1 {
		t.Errorf("Get(1) should return 1")
	}
	lRUCache.Put(3, 3)
	if lRUCache.Get(2) != -1 {
		t.Errorf("Get(2) should return -1")
	}
	lRUCache.Put(4, 4)
	if lRUCache.Get(1) != -1 {
		t.Errorf("Get(1) should return -1")
	}
	if lRUCache.Get(3) != 3 {
		t.Errorf("Get(3) should return 3")
	}
	if lRUCache.Get(4) != 4 {
		t.Errorf("Get(4) should return 4")
	}
}

func TestLRUCacheCapacityOne(t *testing.T) {
	lRUCache := Constructor(1)
	lRUCache.Put(1, 1)
	if lRUCache.Get(1) != 1 {
		t.Errorf("Get(1) should return 1")
	}
	lRUCache.Put(2, 2)
	if lRUCache.Get(1) != -1 {
		t.Errorf("Get(1) should return -1")
	}
	if lRUCache.Get(2) != 2 {
		t.Errorf("Get(2) should return 2")
	}
}

func TestLRUCacheUpdateExistingKey(t *testing.T) {
	lRUCache := Constructor(2)
	lRUCache.Put(1, 1)
	lRUCache.Put(2, 2)
	lRUCache.Put(1, 3)
	if lRUCache.Get(1) != 3 {
		t.Errorf("Get(1) should return 3")
	}
} 