<template>
  <WordList :list="markedWords" />
</template>

<script lang="ts" setup>
import useMarkedWords from '@/composables/words/useMarkedWords';
import WordList from '@/components/shared/WordList.vue';

const { getLocalMarkedWords, markedWords } = useMarkedWords();
getLocalMarkedWords();
</script>
