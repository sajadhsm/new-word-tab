import { randomNumberBetween } from './utils.js';

import WORDS from '../../data/words.js';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export default async function getNewWord() {
  const word = getRandomWordFromList();
  const wordDefinition = await getWordDefinitions(word);
  return wordDefinition;
}

function getRandomWordFromList() {
  const randomWordIndex = randomNumberBetween(0, WORDS.length);
  return WORDS[randomWordIndex];
}

async function getWordDefinitions(word) {
  try {
    const response = await fetch(API_URL + word);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error getting "${word}" definition!`);
    console.error(error);
  }
}