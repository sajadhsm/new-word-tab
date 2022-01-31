import { ref, computed } from 'vue';

import { capitalizeFirstLetter } from '@/utils/string';

import useWordLists from './useWordLists';
import useRandomWord from './useRandomWord';
import wordsHistory from './useWordsHistory';
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

  const { addWordToHistory } = wordsHistory();

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
    const randomWord = getRandomWord().value;

    if (!isWordLearned(randomWord)) {
      await searchWord(randomWord);
      return;
    }

    getWord();
  }

  async function searchWord(searchedWord: string) {
    const lowerCaseWord = searchedWord.toLowerCase();
    await getDefinitions(lowerCaseWord);
    handleUpdateWord(lowerCaseWord);
  }

  function handleUpdateWord(value: string) {
    word.value = value;
    addWordToHistory(value);
    document.title = `NWT • ${capitalizeFirstLetter(value)}`;
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
