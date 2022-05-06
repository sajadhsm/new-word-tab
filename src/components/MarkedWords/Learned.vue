<template>
  <WordList
    :list="learnedWords"
    max-height="calc(100vh - 165px)"
    stretch
    pointer
    @row-click="$emit('show-definition', $event)"
  >
    <template #actions="{ word }">
      <ActionButton
        title="Mark as Learning"
        @click="handleMarkAsLearning(word)"
      >
        <i-ic-outline-school />
      </ActionButton>

      <ActionButton title="Ignore word" @click="handleMarkAsIgnored(word)">
        <i-ic-outline-visibility-off />
      </ActionButton>

      <ActionButton title="Remove from list" @click="removeLearnedWord(word)">
        <i-ic-round-remove-circle-outline />
      </ActionButton>
    </template>

    <template #empty>
      <p class="empty-state">
        Mark words in the <i>Learning</i> tab
        <br />
        by using
        <i-ic-round-check-circle-outline class="empty-state__icon" /> icon
      </p>
    </template>
  </WordList>
</template>

<script lang="ts" setup>
import useLearnedWords from '@/composables/words/useLearnedWords';
import useIgnoredWords from '@/composables/words/useIgnoredWords';
import useLearningWords from '@/composables/words/useLearningWords';

import WordList, { ActionButton } from '@/components/shared/WordList';

defineEmits<{
  (e: 'show-definition', word: string): void;
}>();

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

<style scoped>
.empty-state {
  font-size: 0.9rem;
  padding: 30px 5px;
  text-align: center;
}

.empty-state__icon {
  display: inline-block;
  margin-bottom: -5px;
}
</style>
