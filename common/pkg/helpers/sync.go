package helpers

import "sync"

type SyncMap[K comparable, V any] struct {
	data  map[K]V
	mutex sync.RWMutex
}

func NewSyncMap[K comparable, V any]() *SyncMap[K, V] {
	return &SyncMap[K, V]{
		data:  make(map[K]V),
		mutex: sync.RWMutex{},
	}
}

func (m *SyncMap[K, V]) Get(key K) (V, bool) {
	m.mutex.RLock()
	defer m.mutex.RUnlock()

	value, ok := m.data[key]
	return value, ok
}

func (m *SyncMap[K, V]) Len() int {
	m.mutex.RLock()
	defer m.mutex.RUnlock()

	return len(m.data)
}

func (m *SyncMap[K, V]) Set(key K, value V) {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	m.data[key] = value
}

func (m *SyncMap[K, V]) Delete(key K) (V, bool) {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	value, ok := m.data[key]
	delete(m.data, key)
	return value, ok
}

// ForEach iterates over the key-value pairs in the map and applies the provided function.
// Do not attempt to Set or Delete inside the ForEach, it will result in a deadlock.
func (m *SyncMap[K, V]) ForEach(fn func(key K, value V)) {
	m.mutex.RLock()
	defer m.mutex.RUnlock()

	for key, value := range m.data {
		fn(key, value)
	}
}
