import { ref, computed } from 'vue';

import storage from '@/modules/localStorage';

const IGNORED_WORDS_STORAGE_KEY = 'iw';

export default function useIgnoredWords() {
  const ignoredWords = ref<string[]>([]);

  const ignoredWordsDict = computed(() =>
    ignoredWords.value.reduce(
      (wordsDict: { [word: string]: boolean }, word) => {
        wordsDict[word] = true;
        return wordsDict;
      },
      {}
    )
  );

  function isWordIgnored(word: string) {
    return ignoredWordsDict.value[word];
  }

  function setWordAsIgnored(word: string) {
    const localIgnoredWords = getLocalIgnoredWords(true) as Set<string>;
    localIgnoredWords.add(word);
    storeWordsList(localIgnoredWords);
  }

  function getLocalIgnoredWords(asSet = false) {
    try {
      const localCommaSeparatedWords = storage.get(IGNORED_WORDS_STORAGE_KEY);
      const parsedList = localCommaSeparatedWords?.length
        ? localCommaSeparatedWords.split(',')
        : [];

      const wordsSet = new Set(parsedList);
      const wordsList = Array.from(wordsSet);

      ignoredWords.value = wordsList;

      return asSet ? wordsSet : wordsList;
    } catch {
      ignoredWords.value = [];
      return asSet ? new Set<string>() : [];
    }
  }

  function removeIgnoredWord(word: string) {
    const words = getLocalIgnoredWords(true) as Set<string>;
    words.delete(word);
    storeWordsList(words);
  }

  function storeWordsList(wordsList: Set<string>) {
    const list = Array.from(wordsList);
    ignoredWords.value = list;
    storage.set(IGNORED_WORDS_STORAGE_KEY, list.join());
  }

  return {
    getLocalIgnoredWords,
    removeIgnoredWord,
    setWordAsIgnored,
    isWordIgnored,
    ignoredWordsDict,
    ignoredWords,
  };
}
