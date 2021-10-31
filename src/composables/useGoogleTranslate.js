import storage from '@/modules/localStorage';

import GOOGLE_TRANSLATE_LANGUAGES from '@/data/googleTranslateLanguages';

const GOOGLE_TRANSLATE_TARGET_LANGUAGE_CODE_STORAGE_KEY = 'gttl';

function getTargetLanguageFromStorage(
  fallbackTargetLanguage = {
    code: 'fa',
    lang: 'Persian',
  }
) {
  const localTargetLanguageCode = storage.get(
    GOOGLE_TRANSLATE_TARGET_LANGUAGE_CODE_STORAGE_KEY
  );

  const targetLanguage = GOOGLE_TRANSLATE_LANGUAGES.find(
    ({ code }) => code === localTargetLanguageCode
  );

  return targetLanguage || fallbackTargetLanguage;
}

export default function useGoogleTranslate() {
  const targetLanguage = getTargetLanguageFromStorage();

  function storeTargetLanguageCode(code) {
    storage.set(GOOGLE_TRANSLATE_TARGET_LANGUAGE_CODE_STORAGE_KEY, code);
  }

  return {
    storeTargetLanguageCode,
    targetLanguage,
  };
}
