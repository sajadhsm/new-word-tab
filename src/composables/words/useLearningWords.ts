import { ref } from 'vue';

import storage from '@/modules/localStorage';

// mw to keep it backward compatible
const LEARNING_WORDS_STORAGE_KEY = 'mw';

const learningWords = ref<string[]>([]);

export default function useLearningWords() {
  function setWordAsLearning(word: string) {
    const localLearningWords = getLocalLearningWords(true) as Set<string>;
    localLearningWords.add(word);
    storeWordsList(localLearningWords);
  }

  function getLocalLearningWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(LEARNING_WORDS_STORAGE_KEY);
      const parsedList = localCommaSeparatedWords?.length
        ? localCommaSeparatedWords.split(',')
        : [];

      const wordsSet = new Set(parsedList);
      const wordsList = Array.from(wordsSet);

      learningWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      learningWords.value = [];
      return asSet ? new Set<string>() : [];
    }
  }

  function removeLearningWord(word: string) {
    const words = getLocalLearningWords(true) as Set<string>;
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList: Set<string>) {
    const list = Array.from(wordsList);
    learningWords.value = list;
    storage.set(LEARNING_WORDS_STORAGE_KEY, list.join());
  }

  return {
    getLocalLearningWords,
    removeLearningWord,
    setWordAsLearning,
    learningWords,
  };
}
