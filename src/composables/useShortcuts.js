import { ref } from 'vue';

import storage from '@/modules/localStorage';

const SHORTCUTS_STORAGE_KEY = 's';

const shortcuts = ref([]);

export default function useShortcuts() {
  shortcuts.value = getShortcutsFromStorage();

  function addShortcut(name, url) {
    shortcuts.value.push({ name, url });
    saveShortcutsToStorage(shortcuts.value);
  }

  return {
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
    return { name, url };
  });
}
