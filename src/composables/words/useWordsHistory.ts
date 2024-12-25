import { ref } from 'vue'

import storage from '@/modules/localStorage'

const WORDS_HISTORY_STORAGE_KEY = 'wh'
const HISTORY_LIMIT = 10

const wordsHistory = ref<string[]>([])

export default function useWordsHistory() {
  function addWordToHistory(word: string) {
    const localWordsHistory = getLocalWordsHistory()

    localWordsHistory.unshift(word)

    if (localWordsHistory.length > HISTORY_LIMIT) {
      localWordsHistory.length = HISTORY_LIMIT
    }

    const wordsSet = new Set(localWordsHistory)
    storeWordsList(wordsSet)
  }

  function getLocalWordsHistory() {
    try {
      const localCommaSeparatedWords = storage.get(WORDS_HISTORY_STORAGE_KEY)
      const parsedList = localCommaSeparatedWords?.length
        ? localCommaSeparatedWords.split(',')
        : []

      const wordsSet = new Set(parsedList)
      const wordsList = Array.from(wordsSet)

      wordsHistory.value = wordsList
      return wordsList
    }
    catch {
      wordsHistory.value = []
      return []
    }
  }

  function storeWordsList(wordsList: Set<string>) {
    const list = Array.from(wordsList)
    wordsHistory.value = list
    storage.set(WORDS_HISTORY_STORAGE_KEY, list.join())
  }

  return {
    getLocalWordsHistory,
    addWordToHistory,
    wordsHistory,
  }
}
