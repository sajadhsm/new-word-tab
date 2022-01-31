import { ref, watch, Ref } from 'vue';

import { getUrlHostname } from '@/utils/url';
import storage from '@/modules/localStorage';

export type Shortcut = {
  name: string
  url: string
  hostname: string
}

const SHORTCUTS_STORAGE_KEY = 's';
const IS_SHORTCUTS_DISABLE_STORAGE_KEY = 'sd';

const shortcuts: Ref<Shortcut[]> = ref([]);
export const isActive = ref(true);

export default function useShortcuts() {
  isActive.value = getShortcutsActiveStateFromStorage();
  shortcuts.value = getShortcutsFromStorage();

  function addShortcut(name: string, url: string) {
    shortcuts.value.push(shortcutFactory(name, url));
    saveShortcutsToStorage();
  }

  function saveShortcutsToStorage() {
    storage.set(SHORTCUTS_STORAGE_KEY, compressShortcuts(shortcuts.value));
  }

  function removeShortcut(name: string) {
    const index = findShortcutIndexByName(name);

    if (index !== -1) {
      shortcuts.value.splice(index, 1);
      saveShortcutsToStorage();
    }
  }

  function editShortcut(oldName: string, newName: string, newUrl: string) {
    const index = findShortcutIndexByName(oldName);

    if (index !== -1) {
      shortcuts.value.splice(index, 1, shortcutFactory(newName, newUrl));
      saveShortcutsToStorage();
    }
  }

  function findShortcutIndexByName(name: string) {
    return shortcuts.value.findIndex((shortcut) => shortcut.name === name);
  }

  watch(isActive, saveShortcutsActiveStateToStorage);

  return {
    isActive,
    shortcuts,
    addShortcut,
    editShortcut,
    removeShortcut,
    saveShortcutsToStorage,
  };
}

function compressShortcuts(shortcutsList: Shortcut[]) {
  return shortcutsList.map(({ name, url }) => `${name}"${url}`).join('`');
}

function getShortcutsFromStorage() {
  const localShortcuts = storage.get(SHORTCUTS_STORAGE_KEY);

  return localShortcuts ? parseSavedShortcuts(localShortcuts) : [];
}

function parseSavedShortcuts(shortcutsString: string) {
  // name"url`name"url'...
  return shortcutsString.split('`').map((shortcut: string) => {
    const [name, url] = shortcut.split('"');
    return shortcutFactory(name, url);
  });
}

function shortcutFactory(name: string, url: string): Shortcut {
  return { url, name, hostname: getUrlHostname(url) };
}

function getShortcutsActiveStateFromStorage() {
  return !storage.get(IS_SHORTCUTS_DISABLE_STORAGE_KEY);
}

function saveShortcutsActiveStateToStorage(active: boolean) {
  if (active) {
    storage.remove(IS_SHORTCUTS_DISABLE_STORAGE_KEY);
  } else {
    storage.set(IS_SHORTCUTS_DISABLE_STORAGE_KEY, String(1));
  }
}
