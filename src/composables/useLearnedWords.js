import { ref, computed } from 'vue';

import storage from '@/modules/localStorage';

const LEARNED_WORDS_STORAGE_KEY = 'lw';

export default function useLearnedWords() {
  const learnedWords = ref([]);

  const learnedWordsDict = computed(() =>
    learnedWords.value.reduce((wordsDict, word) => {
      wordsDict[word] = true;
      return wordsDict;
    }, {})
  );

  function isWordLearned(word) {
    return learnedWordsDict.value[word];
  }

  function setWordAsLearned(word) {
    const localLearnedWords = getLocalLearnedWords(true);
    localLearnedWords.add(word);
    const list = Array.from(localLearnedWords);
    learnedWords.value = Array.from(list);
    storage.set(LEARNED_WORDS_STORAGE_KEY, list.join());
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
    learnedWordsDict,
    learnedWords,
  };
}
