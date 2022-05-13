import { computed, ref, watch } from 'vue';

import storage from '@/modules/localStorage';

type BackgroundMode = 'theme' | 'file';

const BACKGROUND_STORAGE_KEY = 'bg';

const mode = ref<BackgroundMode>('theme');

export default function useBackground({ initialize = false } = {}) {
  const url = ref('');

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

        const isBase64 = value.startsWith('data:');
        if (!isBase64) url.value = value;
      }
    }
  }

  watch(mode, handleModeChange);

  async function handleModeChange(newMode: BackgroundMode) {
    if (newMode === 'theme') {
      storage.remove(BACKGROUND_STORAGE_KEY);
      setBodyBackgroundImage(null);
      url.value = '';
    }
  }

  function saveImageDataURL(imageDataURL: string) {
    storage.set(BACKGROUND_STORAGE_KEY, `file|${imageDataURL}`);
    setBodyBackgroundImage(imageDataURL);

    const isBase64 = imageDataURL.startsWith('data:');
    if (isBase64) url.value = '';
  }

  function setBodyBackgroundImage(imageURL: string | null) {
    document.body.style.backgroundImage = imageURL ? `url(${imageURL})` : '';
  }

  return {
    shouldModifyUI: computed(() => mode.value === 'file'),
    saveImageDataURL,
    mode,
    url,
  };
}
