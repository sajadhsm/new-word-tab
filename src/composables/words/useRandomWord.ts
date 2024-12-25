import type { Ref } from 'vue'
import { ref } from 'vue'

import { randomNumberBetween } from '@/utils/number'

export default function useRandomWord(wordsList: Ref<string[]>) {
  const randomWord = ref('')

  function getRandomWord() {
    const randomWordIndex = randomNumberBetween(0, wordsList.value.length - 1)
    randomWord.value = wordsList.value[randomWordIndex]

    return randomWord
  }

  return {
    getRandomWord,
    randomWord,
  }
}
