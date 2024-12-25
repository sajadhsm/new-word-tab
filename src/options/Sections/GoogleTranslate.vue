<script setup lang="ts">
import { ref } from 'vue'

import Section from '../components/Section.vue'
import Select from '../components/Select.vue'

import useGoogleTranslate from '@/composables/useGoogleTranslate'

import languages from '@/data/googleTranslateLanguages'

const { targetLanguage, storeTargetLanguageCode } = useGoogleTranslate()
const selectedTargetLanguage = ref(targetLanguage)

function handleSaveGoogleTranslateLanguage() {
  storeTargetLanguageCode(selectedTargetLanguage.value.code)
}

const options = languages.map(lang => ({ text: lang.lang, value: lang }))
</script>

<template>
  <Section
    title="Google Translate"
    description="Change Google translate target language."
  >
    <template #bar>
      <Select
        v-model="selectedTargetLanguage"
        title="Select target language"
        :options="options"
        @change="handleSaveGoogleTranslateLanguage"
      />
    </template>
  </Section>
</template>
