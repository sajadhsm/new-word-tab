<template><WordList :list="learnedWords" /></template>

<script lang="ts" setup>
import useLearnedWords from '@/composables/words/useLearnedWords';
import WordList from '@/components/shared/WordList.vue';

const { learnedWords, getLocalLearnedWords } = useLearnedWords();
getLocalLearnedWords();
</script>
