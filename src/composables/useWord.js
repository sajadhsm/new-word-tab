import { ref, computed } from 'vue';

import { capitalizeFirstLetter } from '@/utils/string';

import useWordLists from './useWordLists';
import useRandomWord from './useRandomWord';
import useLearnedWord from './useLearnedWords';
import useWordDefinitions from './useWordDefinitions';

const word = ref('');

export default function useWord() {
  const { wordsPoll } = useWordLists();

  const {
    learnedWords,
    learnedWordsDict,
    isWordLearned,
    getLocalLearnedWords,
  } = useLearnedWord();

  const unlearnedWords = computed(() =>
    wordsPoll.value.filter((word) => !learnedWordsDict.value[word])
  );

  const { getRandomWord } = useRandomWord(unlearnedWords);

  const { isLoading, definitions, error, getDefinitions } =
    useWordDefinitions();

  const hasLearnedAllWords = computed(
    () => wordsPoll.value.length <= learnedWords.value.length
  );

  async function getWord() {
    getLocalLearnedWords();
    word.value = getRandomWord().value;

    if (hasLearnedAllWords.value) {
      word.value = 'end';
      return;
    }

    if (!isWordLearned(word.value)) {
      await getDefinitions(word.value);
      document.title = `NWT • ${capitalizeFirstLetter(word.value)}`;
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
    wordsPoll,
    getWord,
    error,
    word,
  };
}
