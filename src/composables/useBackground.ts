import { computed, ref, watch } from 'vue';

import storage from '@/modules/localStorage';

export enum BackgroundMode {
  NO_BG = 'NO_BG',
  IMAGE = 'IMAGE',
}

const BACKGROUND_STORAGE_KEY = 'bg';

const mode = ref<BackgroundMode>(BackgroundMode.NO_BG);

export default function useBackground({ initialize = false } = {}) {
  const url = ref('');

  if (initialize) init();

  function init() {
    const storedValue = storage.get(BACKGROUND_STORAGE_KEY);

    if (!storedValue) {
      mode.value = BackgroundMode.NO_BG;
    } else {
      const [type, value] = storedValue.split('|');

      if (type === BackgroundMode.IMAGE) {
        mode.value = BackgroundMode.IMAGE;
        setBodyBackgroundImage(value);

        const isBase64 = value.startsWith('data:');
        if (!isBase64) url.value = value;
      }
    }
  }

  watch(mode, handleModeChange);

  async function handleModeChange(newMode: BackgroundMode) {
    if (newMode === BackgroundMode.NO_BG) {
      storage.remove(BACKGROUND_STORAGE_KEY);
      setBodyBackgroundImage(null);
      url.value = '';
    }
  }

  function saveImageDataURL(imageDataURL: string) {
    storage.set(
      BACKGROUND_STORAGE_KEY,
      `${BackgroundMode.IMAGE}|${imageDataURL}`
    );
    setBodyBackgroundImage(imageDataURL);

    const isBase64 = imageDataURL.startsWith('data:');
    if (isBase64) url.value = '';
  }

  function setBodyBackgroundImage(imageURL: string | null) {
    const BACKGROUND_STYLE_TAG_ID = 'bdy-bg-img';
    let styleTag = document.getElementById(BACKGROUND_STYLE_TAG_ID);

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = BACKGROUND_STYLE_TAG_ID;
      document.head.appendChild(styleTag);
    }

    styleTag.innerText = imageURL
      ? `body { background-image: url(${imageURL}); }`
      : '';
  }

  return {
    shouldModifyUI: computed(() => mode.value === BackgroundMode.IMAGE),
    saveImageDataURL,
    mode,
    url,
  };
}
