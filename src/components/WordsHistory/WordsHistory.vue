<template>
  <IconButton class="open-btn" title="History" @click="isModalOpen = true">
    <i-ic-round-history />
  </IconButton>

  <Modal
    v-model="isModalOpen"
    title="History"
    subtitle="Last words that have been displayed."
  >
    <WordsList @check="isModalOpen = false" />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconButton from '@/components/shared/IconButton.vue';
import Modal from '@/components/shared/Modal.vue';
import WordsList from './WordsList.vue';

const isModalOpen = ref(false);
</script>

<style scoped>
.open-btn {
  position: fixed;
  bottom: 3.5rem;
  right: 1rem;
}
</style>
