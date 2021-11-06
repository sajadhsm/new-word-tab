import { ref, watch } from 'vue';

import { getUrlHostname } from '@/utils/url';
import storage from '@/modules/localStorage';

const SHORTCUTS_STORAGE_KEY = 's';
const IS_SHORTCUTS_DISABLE_STORAGE_KEY = 'sd';

const shortcuts = ref([]);
const isActive = ref(true);

export default function useShortcuts() {
  isActive.value = getShortcutsActiveStateFromStorage();
  shortcuts.value = getShortcutsFromStorage();

  function addShortcut(name, url) {
    shortcuts.value.push({ name, url, hostname: getUrlHostname(url) });
    saveShortcutsToStorage(shortcuts.value);
  }

  watch(isActive, saveShortcutsActiveStateToStorage);

  return {
    isActive,
    shortcuts,
    addShortcut,
  };
}

function saveShortcutsToStorage(shortcuts) {
  storage.set(SHORTCUTS_STORAGE_KEY, compressShortcuts(shortcuts));
}

function compressShortcuts(shortcutsList) {
  return shortcutsList.map(({ name, url }) => `${name};${url}`).join('|');
}

function getShortcutsFromStorage() {
  const localShortcuts = storage.get(SHORTCUTS_STORAGE_KEY);

  return localShortcuts ? parseSavedShortcuts(localShortcuts) : [];
}

function parseSavedShortcuts(shortcutsString) {
  // name;url|name;url|...
  return shortcutsString.split('|').map((shortcut) => {
    const [name, url] = shortcut.split(';');
    return { name, url, hostname: getUrlHostname(url) };
  });
}

function getShortcutsActiveStateFromStorage() {
  return !storage.get(IS_SHORTCUTS_DISABLE_STORAGE_KEY);
}

function saveShortcutsActiveStateToStorage(active) {
  if (active) {
    storage.remove(IS_SHORTCUTS_DISABLE_STORAGE_KEY);
  } else {
    storage.set(IS_SHORTCUTS_DISABLE_STORAGE_KEY, 1);
  }
}
