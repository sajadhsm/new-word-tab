import { ref, computed } from 'vue';

import storage from '@/modules/localStorage';

const MARKED_WORDS_STORAGE_KEY = 'mw';

export default function useMarkedWords() {
  const markedWords = ref([]);

  const markedWordsDict = computed(() =>
    markedWords.value.reduce((wordsDict, word) => {
      wordsDict[word] = true;
      return wordsDict;
    }, {})
  );

  function isWordMarked(word) {
    return markedWordsDict.value[word];
  }

  function setWordAsMarked(word) {
    const localMarkedWords = getLocalMarkedWords(true);
    localMarkedWords.add(word);
    storeWordsList(localMarkedWords);
  }

  function getLocalMarkedWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(MARKED_WORDS_STORAGE_KEY);
      const parsedList = localCommaSeparatedWords.length
        ? localCommaSeparatedWords.split(',')
        : [];

      const wordsSet = new Set(parsedList);
      const wordsList = Array.from(wordsSet);

      markedWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      markedWords.value = [];
      return asSet ? new Set() : [];
    }
  }

  function removeMarkedWord(word) {
    const words = getLocalMarkedWords(true);
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList) {
    const list = Array.from(wordsList);
    markedWords.value = list;
    storage.set(MARKED_WORDS_STORAGE_KEY, list.join());
  }

  return {
    getLocalMarkedWords,
    removeMarkedWord,
    setWordAsMarked,
    isWordMarked,
    markedWordsDict,
    markedWords,
  };
}