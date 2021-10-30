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
    storeWordsList(localLearnedWords);
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

  function removeLearnedWord(word) {
    const words = getLocalLearnedWords(true);
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList) {
    const list = Array.from(wordsList);
    learnedWords.value = list;
    storage.set(LEARNED_WORDS_STORAGE_KEY, list.join());
  }

  return {
    getLocalLearnedWords,
    removeLearnedWord,
    setWordAsLearned,
    isWordLearned,
    learnedWordsDict,
    learnedWords,
  };
}
