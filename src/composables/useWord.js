import { computed } from 'vue';

import WORDS from '@/data/words';

import useRandomWord from './useRandomWord';
import useLearnedWord from './useLearnedWords';
import useWordDefinitions from './useWordDefinitions';

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

  const { randomWord, getRandomWord } = useRandomWord(unlearnedWords);

  const { isLoading, definitions, error, getDefinitions } =
    useWordDefinitions();

  const hasLearnedAllWords = computed(
    () => WORDS.length <= learnedWords.value.length
  );

  function getWord() {
    getLocalLearnedWords();
    getRandomWord();

    if (hasLearnedAllWords.value) {
      randomWord.value = 'end';
      return;
    }

    if (!isWordLearned(randomWord.value)) {
      getDefinitions(randomWord.value);
      return;
    }

    getWord();
  }

  return {
    hasLearnedAllWords,
    word: randomWord,
    definitions,
    isLoading,
    getWord,
    error,
  };
}
