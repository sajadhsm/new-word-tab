<template>
  <WordList :list="learningWords">
    <template #actions="{ word }">
      <ActionButton title="Mark as Learned" @click="handleMarkAsLearned(word)">
        <i-ic-round-check-circle-outline />
      </ActionButton>

      <ActionButton title="Ignore word" @click="handleMarkAsIgnored(word)">
        <i-ic-outline-visibility-off />
      </ActionButton>

      <ActionButton title="Remove from list" @click="removeLearningWord(word)">
        <i-ic-round-remove-circle-outline />
      </ActionButton>
    </template>
  </WordList>
</template>

<script lang="ts" setup>
import useLearnedWords from '@/composables/words/useLearnedWords';
import useIgnoredWords from '@/composables/words/useIgnoredWords';
import useLearningWords from '@/composables/words/useLearningWords';

import WordList from '@/components/shared/WordList.vue';
import ActionButton from './ActionButton.vue';

const { setWordAsIgnored } = useIgnoredWords();
const { setWordAsLearned } = useLearnedWords();
const { learningWords, getLocalLearningWords, removeLearningWord } =
  useLearningWords();

function handleMarkAsLearned(word: string) {
  setWordAsLearned(word);
  removeLearningWord(word);
}

function handleMarkAsIgnored(word: string) {
  setWordAsIgnored(word);
  removeLearningWord(word);
}

getLocalLearningWords();
</script>
