import { ref } from 'vue';

import storage from '@/modules/localStorage';

const LEARNED_WORDS_STORAGE_KEY = 'lw';

export default function useLearnedWords() {
  const learnedWords = ref([]);

  function isWordLearned(word) {
    const learnedWords = getLocalLearnedWords();
    return learnedWords.includes(word);
  }

  function setWordAsLearned(word) {
    const localLearnedWords = getLocalLearnedWords(true);
    localLearnedWords.add(word);

    const listToStore = Array.from(localLearnedWords).join();
    storage.set(LEARNED_WORDS_STORAGE_KEY, listToStore);
  }

  function getLocalLearnedWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(LEARNED_WORDS_STORAGE_KEY);
      const wordsSet = new Set(localCommaSeparatedWords.split(','));
      const wordsList = Array.from(wordsSet);

      learnedWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      learnedWords.value = [];
      return asSet ? new Set() : [];
    }
  }

  return {
    getLocalLearnedWords,
    setWordAsLearned,
    isWordLearned,
    learnedWords,
  };
}
