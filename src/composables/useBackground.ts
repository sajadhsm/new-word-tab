import { computed, ref, watch } from 'vue';

import storage from '@/modules/localStorage';

type BackgroundMode = 'theme' | 'file';

const BACKGROUND_STORAGE_KEY = 'bg';

const mode = ref<BackgroundMode>('theme');

export default function useBackground({ initialize = false } = {}) {
  if (initialize) init();

  function init() {
    const storedValue = storage.get(BACKGROUND_STORAGE_KEY);

    if (!storedValue) {
      mode.value = 'theme';
    } else {
      const [type, value] = storedValue.split('|');

      if (type === 'file') {
        mode.value = 'file';
        setBodyBackgroundImage(value);
      }
    }
  }

  watch(mode, handleModeChange);

  async function handleModeChange(newMode: BackgroundMode) {
    if (newMode === 'theme') {
      storage.remove(BACKGROUND_STORAGE_KEY);
      setBodyBackgroundImage(null);
    }
  }

  function saveImageBase64(base64: string) {
    storage.set(BACKGROUND_STORAGE_KEY, `file|${base64}`);
    setBodyBackgroundImage(base64);
  }

  function setBodyBackgroundImage(imageURL: string | null) {
    document.body.style.backgroundImage = imageURL ? `url(${imageURL})` : '';
  }

  return {
    shouldModifyUI: computed(() => mode.value === 'file'),
    saveImageBase64,
    mode,
  };
}
