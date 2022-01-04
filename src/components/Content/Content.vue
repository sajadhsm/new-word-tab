<template>
  <NoWordList v-if="!wordsPoll.length" />
  <OfflineState v-else-if="!isOnline" />
  <Loading v-else-if="isLoading" />
  <WordFetchError v-else-if="error" :word="word" @retry="getWord" />
  <LearnedAllWords v-else-if="hasLearnedAllWords" />
  <Word v-else :word="word" :definitions="definitions" @marked="getWord" />
</template>

<script>
import LearnedAllWords from './LearnedAllWords.vue';
import WordFetchError from './WordFetchError.vue';
import OfflineState from './OfflineState.vue';
import NoWordList from './NoWordList.vue';
import Loading from './Loading.vue';
import Word from './Word.vue';

import useOnline from '@/composables/useOnline';
import useWord from '@/composables/words/useWord';

export default {
  name: 'Content',

  components: {
    LearnedAllWords,
    WordFetchError,
    OfflineState,
    NoWordList,
    Loading,
    Word,
  },

  setup() {
    const {
      hasLearnedAllWords,
      definitions,
      isLoading,
      wordsPoll,
      getWord,
      error,
      word,
    } = useWord();

    const { isOnline } = useOnline();

    getWord();

    return {
      hasLearnedAllWords,
      definitions,
      isLoading,
      wordsPoll,
      getWord,
      error,
      word,

      isOnline,
    };
  },
};
</script>
