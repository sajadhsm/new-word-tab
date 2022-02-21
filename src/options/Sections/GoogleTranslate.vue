<template>
  <div class="op-section g-translate">
    <div>
      <h2 class="op-section__title">Google Translate</h2>
      <p class="op-section__subtitle">
        Change Google translate target language.
      </p>
    </div>

    <Select
      v-model="selectedTargetLanguage"
      title="Select target language"
      :options="options"
      @change="handleSaveGoogleTranslateLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Select from '../components/Select.vue';

import useGoogleTranslate from '@/composables/useGoogleTranslate';

import languages from '@/data/googleTranslateLanguages';

const { targetLanguage, storeTargetLanguageCode } = useGoogleTranslate();
const selectedTargetLanguage = ref(targetLanguage);

function handleSaveGoogleTranslateLanguage() {
  storeTargetLanguageCode(selectedTargetLanguage.value.code);
}

const options = languages.map((lang) => ({ text: lang.lang, value: lang }));
</script>

<style scoped>
.g-translate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
