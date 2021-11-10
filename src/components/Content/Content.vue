<template>
  <NoWordList v-if="!wordsPoll.length" />
  <Loading v-else-if="isLoading" />
  <Error v-else-if="error" @retry="getWord" />
  <LearnedAllWords v-else-if="hasLearnedAllWords" />
  <Word v-else :word="word" :definitions="definitions" @learned="getWord" />
</template>

<script>
import LearnedAllWords from './LearnedAllWords.vue';
import NoWordList from './NoWordList.vue';
import Loading from './Loading.vue';
import Error from './Error.vue';
import Word from './Word.vue';

import useWord from '@/composables/useWord';

export default {
  name: 'Content',

  components: {
    LearnedAllWords,
    NoWordList,
    Loading,
    Error,
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

    getWord();

    return {
      hasLearnedAllWords,
      definitions,
      isLoading,
      wordsPoll,
      getWord,
      error,
      word,
    };
  },
};
</script>
