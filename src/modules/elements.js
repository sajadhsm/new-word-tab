export const APP_ELEMENT = get('#app');
export const WORD_ELEMENT = get('.word');
export const MEANINGS_ELEMENT = get('.meanings');
export const PHONETIC_ELEMENT = get('.phonetic__text');
export const PHONETIC_PLAY_BUTTON = get('.phonetic__play');

function get(selector) {
  return document.querySelector(selector);
}