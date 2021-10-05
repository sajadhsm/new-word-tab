import { getElement } from './utils.js';

export const APP_ELEMENT = getElement('#app');

export const WORD_ELEMENT = getElement('.word');
export const MEANINGS_ELEMENT = getElement('.meanings');
export const PHONETIC_ELEMENT = getElement('.phonetic__text');
export const PHONETIC_LISTEN_BUTTON = getElement('.phonetic__listen-btn');

export const THEME_SWITCH_BUTTON = getElement('.theme-btn');
export const THEME_SVG_IMG_ELEMENT = getElement('img', THEME_SWITCH_BUTTON);

export const ERROR_CONTAINER = getElement('.error');
export const ERROR_RETRY_BUTTON = getElement('.error__retry-btn');
