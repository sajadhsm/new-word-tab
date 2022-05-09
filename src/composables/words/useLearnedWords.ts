import { useStoredList } from './useStoredList';

const LEARNED_WORDS_STORAGE_KEY = 'lw';

export default function useLearnedWords() {
  const { list, add, has, remove, load } = useStoredList(
    LEARNED_WORDS_STORAGE_KEY
  );

  load();

  return {
    removeLearnedWords: remove,
    reloadLearnedWords: load,
    isLearnedWord: has,
    setAsLearned: add,
    learnedWords: list,
  };
}
