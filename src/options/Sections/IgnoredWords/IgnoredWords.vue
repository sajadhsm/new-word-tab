<template>
  <Section
    title="Ignored words"
    description="Ignored words don't show up in new tabs. You can remove them from the list, so they will reappear in a new tab."
    column
  >
    <WordList :list="ignoredWords" max-height="250px" dense border>
      <template #top-action>
        <ImportFile @import="handleImportFile" />
      </template>

      <template #actions="{ word }">
        <ActionButton
          title="Remove from list"
          @click="removeIgnoredWords(word)"
        >
          <i-ic-round-remove-circle-outline />
        </ActionButton>
      </template>

      <template #empty>
        <p class="empty-state">
          Add a word to ignored list using
          <i-ic-round-visibility-off class="empty-state__icon" /> icon
        </p>
      </template>
    </WordList>
  </Section>
</template>

<script setup lang="ts">
import useIgnoredWords from '@/composables/words/useIgnoredWords';

import WordList, { ActionButton } from '@/components/shared/WordList';
import Section from '@/options/components/Section.vue';
import ImportFile from './ImportFile.vue';

const { ignoredWords, removeIgnoredWords, setAsIgnored } = useIgnoredWords();

function handleImportFile(words: string[]) {
  setAsIgnored(words);
}
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
