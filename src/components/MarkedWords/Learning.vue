<template>
  <WordList :list="learningWords">
    <template #actions="{ word }">
      <ActionButton title="Mark as Learned" @click="handleMarkAsLearned(word)">
        <i-ic-round-check-circle-outline />
      </ActionButton>

      <ActionButton title="Ignore word">
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
import useLearningWords from '@/composables/words/useLearningWords';

import WordList from '@/components/shared/WordList.vue';
import ActionButton from './ActionButton.vue';

const { setWordAsLearned } = useLearnedWords();
const { learningWords, getLocalLearningWords, removeLearningWord } =
  useLearningWords();

function handleMarkAsLearned(word: string) {
  setWordAsLearned(word);
  removeLearningWord(word);
}

getLocalLearningWords();
</script>
