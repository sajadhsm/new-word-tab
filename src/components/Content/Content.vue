<script setup lang="ts">
import useOnline from '@/composables/useOnline'
import useWord from '@/composables/words/useWord'
import LearnedAllWords from './LearnedAllWords.vue'
import Loading from './Loading.vue'
import NoWordList from './NoWordList.vue'
import OfflineState from './OfflineState.vue'

import Word from './Word.vue'
import WordFetchError from './WordFetchError.vue'

const {
  hasLearnedAllWords,
  definitions,
  isLoading,
  wordsPoll,
  getWord,
  error,
  word,
} = useWord()

const { isOnline } = useOnline()

getWord()
</script>

<template>
  <NoWordList v-if="!wordsPoll.length" />
  <OfflineState v-else-if="!isOnline" />
  <Loading v-else-if="isLoading" />
  <WordFetchError v-else-if="error" :word="word" @retry="getWord" />
  <LearnedAllWords v-else-if="hasLearnedAllWords" />
  <Word
    v-else
    :word="word"
    :definitions="definitions || []"
    @marked="getWord"
  />
</template>
