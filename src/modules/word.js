import { APP_ELEMENT, ERROR_CONTAINER, ERROR_RETRY_BUTTON } from './elements.js';
import { randomNumberBetween } from './utils.js';
import displayWordDefinitions from './render.js';

import WORDS from '../../data/words.js';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';


ERROR_RETRY_BUTTON.addEventListener('click', fetchAndDisplayNewWord);


export default async function fetchAndDisplayNewWord() {
  const wordDefinitions = await getNewWord();
  displayWordDefinitions(wordDefinitions);
}

async function getNewWord() {
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
    APP_ELEMENT.style.display = 'block';
    ERROR_CONTAINER.style.display = 'none';

    const response = await fetch(API_URL + word);

    if (!response.ok) {
      throw new Error('Failed due to network response.')
    }

    const data = await response.json();
    return data;
  } catch (error) {
    ERROR_CONTAINER.style.display = 'block';
    APP_ELEMENT.style.display = 'none';
  }
}