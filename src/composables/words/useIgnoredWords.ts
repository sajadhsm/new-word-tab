import { useStoredList } from './useStoredList';

const IGNORED_WORDS_STORAGE_KEY = 'iw';

export default function useIgnoredWords() {
  const { list, add, has, remove, load } = useStoredList(
    IGNORED_WORDS_STORAGE_KEY
  );

  load();

  return {
    removeIgnoredWords: remove,
    reloadIgnoredWords: load,
    isIgnoredWord: has,
    setAsIgnored: add,
    ignoredWords: list,
  };
}
