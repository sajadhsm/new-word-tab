<template>
  <Loading v-if="isLoading" />
  <Error v-else-if="error" @retry="getRandomWord" />
  <Word v-else :word="randomWord" :definitions="definitions" />
</template>

<script>
import Loading from './Loading.vue';
import Error from './Error.vue';
import Word from './Word.vue';

import useRandomWord from '@/composables/useRandomWord';
import useWordDefinitions from '@/composables/useWordDefinitions';

export default {
  name: 'Content',

  components: { Loading, Error, Word },

  setup() {
    const { randomWord, getRandomWord } = useRandomWord();

    const { getDefinitions, definitions, isLoading, error } =
      useWordDefinitions(randomWord);

    return {
      getRandomWord,
      randomWord,

      getDefinitions,
      definitions,
      isLoading,
      error,
    };
  },
};
</script>
