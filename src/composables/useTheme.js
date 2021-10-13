import { ref, watchEffect } from 'vue';
import storage from '@/modules/localStorage';

const THEME_STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'];

function getThemeFromStorage(fallbackTheme = 'light') {
  const localTheme = storage.get(THEME_STORAGE_KEY);
  const isThemeValid = localTheme && THEMES.includes(localTheme);

  return isThemeValid ? localTheme : fallbackTheme;
}

export default function useTheme() {
  const theme = ref(getThemeFromStorage());

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  watchEffect(() => {
    THEMES.forEach((t) => document.body.classList.remove(t));
    document.body.classList.add(theme.value);
    storage.set(THEME_STORAGE_KEY, theme.value);
  });

  return {
    theme,
    toggleTheme,
  };
}
