<template>
  <Section
    title="Ignored words"
    description='These are the words that you have marked as "Ignored". you can remove them from the list, so they will reappear in a new tab.'
    column
  >
    <WordList :list="ignoredWords">
      <template #actions="{ word }">
        <button
          class="remove-btn"
          title="Remove from list"
          @click="removeIgnoredWord(word)"
        >
          <i-ic-round-remove-circle-outline />
        </button>
      </template>
    </WordList>
  </Section>
</template>

<script setup lang="ts">
import Section from '../components/Section.vue';

import useIgnoredWords from '@/composables/words/useIgnoredWords';
import WordList from '@/components/shared/WordList.vue';

const { ignoredWords, getLocalIgnoredWords, removeIgnoredWord } =
  useIgnoredWords();

getLocalIgnoredWords();
</script>

<style scoped>
.remove-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.25;
}
.remove-btn:hover {
  opacity: 1;
}
</style>
