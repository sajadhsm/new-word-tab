import { ref } from 'vue'

export interface IWordDefinition {
  word: string
  phonetic?: string
  phonetics: { text?: string, audio?: string }[]
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }[]
  }[]
}

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const definitions = ref<IWordDefinition[] | null>(null)
const isLoading = ref(false)
const error = ref<unknown>(null)

export default function useWordDefinitions() {
  async function getDefinitions(word: string) {
    try {
      isLoading.value = true
      error.value = null

      const response = await fetch(API_URL + word)

      if (!response.ok) {
        throw new Error('Failed due to network response.')
      }

      const data: IWordDefinition[] = await response.json()

      definitions.value = data
    }
    catch (e: unknown) {
      error.value = e
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    getDefinitions,
    definitions,
    isLoading,
    error,
  }
}
