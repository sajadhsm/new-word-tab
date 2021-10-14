import { ref, watchEffect } from 'vue';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export default function useWordDefinitions(word) {
  const definitions = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  async function getDefinitions() {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch(API_URL + word.value);

      if (!response.ok) {
        throw new Error('Failed due to network response.');
      }

      const data = await response.json();

      definitions.value = data;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(getDefinitions);

  return {
    getDefinitions,
    definitions,
    isLoading,
    error,
  };
}
