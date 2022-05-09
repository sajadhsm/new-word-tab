import { ref, computed } from 'vue';

import { capitalizeFirstLetter } from '@/utils/string';

import useWordLists from './useWordLists';
import useRandomWord from './useRandomWord';
import wordsHistory from './useWordsHistory';
import useIgnoredWords from './useIgnoredWords';
import useWordDefinitions from './useWordDefinitions';

const word = ref('');

export default function useWord() {
  const { wordsPoll } = useWordLists();

  const { ignoredWords, isIgnoredWord, reloadIgnoredWords } = useIgnoredWords();

  const { addWordToHistory } = wordsHistory();

  const unIgnoredWords = computed(() =>
    wordsPoll.value.filter((word) => !isIgnoredWord(word))
  );

  const { getRandomWord } = useRandomWord(unIgnoredWords);

  const { isLoading, definitions, error, getDefinitions } =
    useWordDefinitions();

  const hasLearnedAllWords = computed(
    () => wordsPoll.value.length <= ignoredWords.value.length
  );

  async function getWord() {
    reloadIgnoredWords();

    const randomWord = getRandomWord().value;
    if (!randomWord) return;

    searchWord(randomWord);
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
