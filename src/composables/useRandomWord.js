import { ref } from 'vue';

import WORDS from '@/data/words';
import { randomNumberBetween } from '@/utils/number';

export default function useRandomWord() {
  const randomWord = ref(null);

  function getRandomWord() {
    const randomWordIndex = randomNumberBetween(0, WORDS.length);
    randomWord.value = WORDS[randomWordIndex];

    return randomWord;
  }

  getRandomWord();

  return {
    getRandomWord,
    randomWord,
  };
}
