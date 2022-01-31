import { ref } from 'vue';

import storage from '@/modules/localStorage';

const MARKED_WORDS_STORAGE_KEY = 'mw';

const markedWords = ref<string[]>([]);

export default function useMarkedWords() {
  function setWordAsMarked(word: string) {
    const localMarkedWords = getLocalMarkedWords(true) as Set<string>;
    localMarkedWords.add(word);
    storeWordsList(localMarkedWords);
  }

  function getLocalMarkedWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(MARKED_WORDS_STORAGE_KEY);
      const parsedList = localCommaSeparatedWords?.length
        ? localCommaSeparatedWords.split(',')
        : [];

      const wordsSet = new Set(parsedList);
      const wordsList = Array.from(wordsSet);

      markedWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      markedWords.value = [];
      return asSet ? new Set<string>() : [];
    }
  }

  function removeMarkedWord(word: string) {
    const words = getLocalMarkedWords(true) as Set<string>;
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList: Set<string>) {
    const list = Array.from(wordsList);
    markedWords.value = list;
    storage.set(MARKED_WORDS_STORAGE_KEY, list.join());
  }

  return {
    getLocalMarkedWords,
    removeMarkedWord,
    setWordAsMarked,
    markedWords,
  };
}
