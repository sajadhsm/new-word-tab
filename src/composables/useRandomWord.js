import { ref } from 'vue';

import WORDS from '@/data/words';
import { randomNumberBetween } from '@/utils/number';

export default function useRandomWord() {
  const randomWord = ref(null);

  function getRandomWord() {
    const randomWordIndex = randomNumberBetween(0, WORDS.length - 1);
    randomWord.value = WORDS[randomWordIndex];

    return randomWord;
  }

  return {
    getRandomWord,
    randomWord,
  };
}
