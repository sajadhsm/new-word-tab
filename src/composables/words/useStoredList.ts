import { ref, computed } from 'vue';

import storage from '@/modules/localStorage';

export function useStoredList(storageKey: string) {
  const _listSet = ref(new Set<string>());
  const list = computed(() => Array.from(_listSet.value));

  function has(item: string) {
    return _listSet.value.has(item);
  }

  function add(items: string | string[]) {
    if (Array.isArray(items)) {
      items.forEach((item) => _listSet.value.add(item));
    } else {
      _listSet.value.add(items);
    }

    _saveToStorage();
  }

  function remove(items: string | string[]) {
    if (Array.isArray(items)) {
      items.forEach(_listSet.value.delete);
    } else {
      _listSet.value.delete(items);
    }

    _saveToStorage();
  }

  function _saveToStorage() {
    storage.set(storageKey, list.value.join());
  }

  function load() {
    try {
      const localCommaSeparatedList = storage.get(storageKey);

      const parsedList = localCommaSeparatedList?.length
        ? localCommaSeparatedList.split(',')
        : [];

      const set = new Set(parsedList);

      _listSet.value = set;
    } catch {
      _listSet.value = new Set();
    }
  }

  return {
    list,
    remove,
    load,
    add,
    has,
  };
}
