import { ref, computed, watch } from 'vue';

import storage from '@/modules/localStorage';
import WORD_LISTS from '@/data/words';

const SELECTED_WORD_LIST_KEYS_STORAGE_KEY = 'swl';

export const selectedListKeys = ref(Object.keys(WORD_LISTS));

export default function useWordLists() {
  selectedListKeys.value = getSelectedWordListKeysFromStorage();

  watch(selectedListKeys, saveSelectedWordListKeysToStorage);

  const wordsPoll = computed(() => {
    let wordsSet = new Set();

    selectedListKeys.value.forEach((listKey) => {
      if (WORD_LISTS[listKey]) {
        wordsSet = new Set([...wordsSet, ...WORD_LISTS[listKey].list]);
      }
    });

    return Array.from(wordsSet);
  });

  return {
    selectedListKeys,
    wordsPoll,
  };
}

function saveSelectedWordListKeysToStorage(list) {
  storage.set(SELECTED_WORD_LIST_KEYS_STORAGE_KEY, list.join(','));
}

function getSelectedWordListKeysFromStorage() {
  const keys = storage.get(SELECTED_WORD_LIST_KEYS_STORAGE_KEY);

  if (keys === null) {
    return Object.keys(WORD_LISTS);
  }

  return keys.split(',');
}
