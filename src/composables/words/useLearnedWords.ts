import { ref, computed } from 'vue';

import storage from '@/modules/localStorage';

const LEARNED_WORDS_STORAGE_KEY = 'lw';

export default function useLearnedWords() {
  const learnedWords = ref<string[]>([]);

  const learnedWordsDict = computed(() =>
    learnedWords.value.reduce((wordsDict: {[word: string]: boolean}, word) => {
      wordsDict[word] = true;
      return wordsDict;
    }, {})
  );

  function isWordLearned(word: string) {
    return learnedWordsDict.value[word];
  }

  function setWordAsLearned(word: string) {
    const localLearnedWords = getLocalLearnedWords(true) as Set<string>;
    localLearnedWords.add(word);
    storeWordsList(localLearnedWords);
  }

  function getLocalLearnedWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(LEARNED_WORDS_STORAGE_KEY);
      const parsedList = localCommaSeparatedWords?.length
        ? localCommaSeparatedWords.split(',')
        : [];

      const wordsSet = new Set(parsedList);
      const wordsList = Array.from(wordsSet);

      learnedWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      learnedWords.value = [];
      return asSet ? new Set<string>() : [];
    }
  }

  function removeLearnedWord(word: string) {
    const words = getLocalLearnedWords(true) as Set<string>;
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList: Set<string>) {
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
