import { useStoredList } from './useStoredList';

// mw to keep it backward compatible
const LEARNING_WORDS_STORAGE_KEY = 'mw';

export default function useLearningWords() {
  const { list, add, has, remove, load } = useStoredList(
    LEARNING_WORDS_STORAGE_KEY
  );

  load();

  return {
    removeLearningWords: remove,
    reloadLearningWords: load,
    isLearningWord: has,
    setAsLearning: add,
    learningWords: list,
  };
}
