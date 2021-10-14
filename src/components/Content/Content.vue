<template>
  <Loading v-if="isLoading" />
  <Error v-else-if="error" @retry="getWord" />
  <Word v-else :word="word" :definitions="definitions" @learned="getWord" />
</template>

<script>
import Loading from './Loading.vue';
import Error from './Error.vue';
import Word from './Word.vue';

import useWord from '@/composables/useWord';

export default {
  name: 'Content',

  components: { Loading, Error, Word },

  setup() {
    const { hasLearnedAllWords, definitions, isLoading, getWord, error, word } =
      useWord();

    getWord();

    return {
      hasLearnedAllWords,
      definitions,
      isLoading,
      getWord,
      error,
      word,
    };
  },
};
</script>
