import { ref } from 'vue';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const definitions = ref(null);
const isLoading = ref(false);
const error = ref(null);

export default function useWordDefinitions() {
  async function getDefinitions(word) {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch(API_URL + word);

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

  return {
    getDefinitions,
    definitions,
    isLoading,
    error,
  };
}
