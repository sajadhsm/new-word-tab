import { ref, computed } from 'vue';

import WORDS from '@/data/words';

import useRandomWord from './useRandomWord';
import useLearnedWord from './useLearnedWords';
import useWordDefinitions from './useWordDefinitions';

const word = ref('');

export default function useWord() {
  const {
    learnedWords,
    learnedWordsDict,
    isWordLearned,
    getLocalLearnedWords,
  } = useLearnedWord();

  const unlearnedWords = computed(() =>
    WORDS.filter((word) => !learnedWordsDict.value[word])
  );

  const { getRandomWord } = useRandomWord(unlearnedWords);

  const { isLoading, definitions, error, getDefinitions } =
    useWordDefinitions();

  const hasLearnedAllWords = computed(
    () => WORDS.length <= learnedWords.value.length
  );

  function getWord() {
    getLocalLearnedWords();
    word.value = getRandomWord().value;

    if (hasLearnedAllWords.value) {
      word.value = 'end';
      return;
    }

    if (!isWordLearned(word.value)) {
      getDefinitions(word.value);
      return;
    }

    getWord();
  }

  function searchWord(searchedWord) {
    word.value = searchedWord;
    getDefinitions(searchedWord);
  }

  return {
    hasLearnedAllWords,
    definitions,
    searchWord,
    isLoading,
    getWord,
    error,
    word,
  };
}
