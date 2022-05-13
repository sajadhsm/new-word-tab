<template>
  <IconButton class="open-btn" title="History" @click="isModalOpen = true">
    <i-ic-round-history />
  </IconButton>

  <Modal
    v-model="isModalOpen"
    title="History"
    subtitle="Last words that have been displayed"
    max-width="400px"
  >
    <WordsList
      :list="wordsHistory"
      no-filters
      pointer
      dense
      @row-click="handleShowDefinition"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import useWordsHistory from '@/composables/words/useWordsHistory';
import useWord from '@/composables/words/useWord';

import IconButton from '@/components/shared/IconButton.vue';
import WordsList from '@/components/shared/WordList';
import Modal from '@/components/shared/Modal.vue';

const { wordsHistory } = useWordsHistory();
const { searchWord } = useWord();

const isModalOpen = ref(false);

const handleShowDefinition = (word: string) => {
  searchWord(word);
  isModalOpen.value = false;
};
</script>
