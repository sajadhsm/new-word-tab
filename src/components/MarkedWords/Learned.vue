<template>
  <WordList :list="learnedWords">
    <template #actions="{ word }">
      <ActionButton
        title="Mark as Learning"
        @click="handleMarkAsLearning(word)"
      >
        <i-ic-round-radar />
      </ActionButton>

      <ActionButton title="Ignore word">
        <i-ic-outline-visibility-off />
      </ActionButton>

      <ActionButton title="Remove from list" @click="removeLearnedWord(word)">
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

const { setWordAsLearning } = useLearningWords();
const { learnedWords, getLocalLearnedWords, removeLearnedWord } =
  useLearnedWords();

function handleMarkAsLearning(word: string) {
  setWordAsLearning(word);
  removeLearnedWord(word);
}

getLocalLearnedWords();
</script>
