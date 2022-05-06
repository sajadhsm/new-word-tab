<template>
  <WordList :list="learnedWords" max-height="calc(100vh - 165px)" stretch>
    <template #actions="{ word }">
      <ActionButton
        title="Mark as Learning"
        @click="handleMarkAsLearning(word)"
      >
        <i-ic-round-radar />
      </ActionButton>

      <ActionButton title="Ignore word" @click="handleMarkAsIgnored(word)">
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
import useIgnoredWords from '@/composables/words/useIgnoredWords';
import useLearningWords from '@/composables/words/useLearningWords';

import WordList from '@/components/shared/WordList.vue';
import ActionButton from './ActionButton.vue';

const { setWordAsIgnored } = useIgnoredWords();
const { setWordAsLearning } = useLearningWords();
const { learnedWords, getLocalLearnedWords, removeLearnedWord } =
  useLearnedWords();

function handleMarkAsLearning(word: string) {
  setWordAsLearning(word);
  removeLearnedWord(word);
}

function handleMarkAsIgnored(word: string) {
  setWordAsIgnored(word);
  removeLearnedWord(word);
}

getLocalLearnedWords();
</script>
