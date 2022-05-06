<template>
  <Section
    title="Ignored words"
    description="Ignored words don't show up in new tabs. You can remove them from the list, so they will reappear in a new tab."
    column
  >
    <WordList :list="ignoredWords" max-height="250px" dense border>
      <template #actions="{ word }">
        <button
          class="remove-btn"
          title="Remove from list"
          @click="removeIgnoredWord(word)"
        >
          <i-ic-round-remove-circle-outline />
        </button>
      </template>

      <template #empty>
        <p class="empty-state">
          Add a word to ignore list using
          <i-ic-round-visibility-off class="empty-state__icon" /> icon
        </p>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: hsla(var(--color-raw), 0.25);
  background-color: transparent;
  transition: color ease-in-out 0.1s;
}

.remove-btn:hover {
  color: var(--color);
}

.empty-state {
  padding: 30px 5px;
  text-align: center;
}

.empty-state__icon {
  display: inline-block;
  margin-bottom: -5px;
}
</style>
