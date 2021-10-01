import { THEME_SWITCH_BUTTON, THEME_SVG_IMG_ELEMENT } from './elements.js';
import storage from './localStorage.js';

const THEME_STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'];

export function initTheme() {
  setTheme(getThemeFromStorage());

  THEME_SWITCH_BUTTON.addEventListener('click', handleSwitchTheme);
}

function getThemeFromStorage(fallbackTheme = 'light') {
  const localTheme = storage.get(THEME_STORAGE_KEY);
  const isThemeValid = localTheme && THEMES.includes(localTheme);

  return isThemeValid ? localTheme : fallbackTheme;
}

function handleSwitchTheme() {
  const localTheme = getThemeFromStorage();
  const switchedTheme = localTheme === 'light' ? 'dark' : 'light';

  setTheme(switchedTheme);
}

function setTheme(theme) {
  THEMES.forEach(t => document.body.classList.remove(t));

  document.body.classList.add(theme);
  THEME_SVG_IMG_ELEMENT.src = `../assets/${theme}_mode.svg`;

  storage.set(THEME_STORAGE_KEY, theme);
}