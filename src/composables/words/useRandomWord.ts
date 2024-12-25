import type { Ref } from 'vue'
import { randomNumberBetween } from '@/utils/number'

import { ref } from 'vue'

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
