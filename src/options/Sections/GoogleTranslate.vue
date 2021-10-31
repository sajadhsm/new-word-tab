<template>
  <div class="op-section g-translate">
    <div>
      <h2 class="op-section__title">Google Translate</h2>
      <p class="op-section__subtitle">
        Change Google translate target language.
      </p>
    </div>

    <select
      v-model="selectedTargetLanguage"
      class="g-translate__select"
      title="Select target language"
      @change="handleSaveGoogleTranslateLanguage"
    >
      <option v-for="lang of languages" :key="lang.code" :value="lang">
        {{ lang.lang }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from 'vue';

import useGoogleTranslate from '@/composables/useGoogleTranslate';

import GOOGLE_TRANSLATE_LANGUAGES from '@/data/googleTranslateLanguages';

export default {
  name: 'GoogleTranslate',

  setup() {
    const { targetLanguage, storeTargetLanguageCode } = useGoogleTranslate();
    const selectedTargetLanguage = ref(targetLanguage);

    function handleSaveGoogleTranslateLanguage() {
      storeTargetLanguageCode(selectedTargetLanguage.value.code);
    }

    return {
      languages: GOOGLE_TRANSLATE_LANGUAGES,
      handleSaveGoogleTranslateLanguage,
      selectedTargetLanguage,
    };
  },
};
</script>

<style>
.g-translate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.g-translate__select {
  cursor: pointer;
  padding: 5px;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 75%);
}
</style>
