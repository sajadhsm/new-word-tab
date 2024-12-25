<script lang="ts" setup>
import WordList, { ActionButton } from '@/components/shared/WordList'
import useIgnoredWords from '@/composables/words/useIgnoredWords'
import useLearnedWords from '@/composables/words/useLearnedWords'

import useLearningWords from '@/composables/words/useLearningWords'

defineEmits<{
  (e: 'showDefinition', word: string): void
}>()

const { setAsIgnored } = useIgnoredWords()
const { setAsLearning } = useLearningWords()
const { learnedWords, removeLearnedWords } = useLearnedWords()

function handleMarkAsLearning(word: string) {
  setAsLearning(word)
  removeLearnedWords(word)
}

function handleMarkAsIgnored(word: string) {
  setAsIgnored(word)
  removeLearnedWords(word)
}
</script>

<template>
  <WordList
    :list="learnedWords"
    max-height="calc(100vh - 165px)"
    stretch
    pointer
    @row-click="$emit('showDefinition', $event)"
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

      <ActionButton title="Remove from list" @click="removeLearnedWords(word)">
        <i-ic-round-remove-circle-outline />
      </ActionButton>
    </template>

    <template #empty>
      <p class="empty-state">
        Mark words in the <i>Learning</i> tab
        <br>
        by using
        <i-ic-round-check-circle-outline class="empty-state__icon" /> icon
      </p>
    </template>
  </WordList>
</template>

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
