export const APP_ELEMENT = get('#app');

export const WORD_ELEMENT = get('.word');
export const MEANINGS_ELEMENT = get('.meanings');
export const PHONETIC_ELEMENT = get('.phonetic__text');
export const PHONETIC_LISTEN_BUTTON = get('.phonetic__listen-btn');

export const THEME_SWITCH_BUTTON = get('.theme-btn');
export const THEME_SVG_IMG_ELEMENT = THEME_SWITCH_BUTTON.querySelector('img');

function get(selector) {
  return document.querySelector(selector);
}