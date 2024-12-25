<script setup lang="ts">
import { ref } from 'vue'

import WordsList from './WordsList.vue'
import IconButton from '@/components/shared/IconButton.vue'
import Modal from '@/components/shared/Modal.vue'

const isModalOpen = ref(false)
</script>

<template>
  <IconButton
    class="open-btn"
    title="Word Inventory"
    @click="isModalOpen = true"
  >
    <i-ic-round-inventory-2 />
  </IconButton>

  <Modal
    v-model="isModalOpen"
    title="Word Inventory"
    subtitle="Browse all included words"
  >
    <WordsList @check="isModalOpen = false" />
  </Modal>
</template>

<style scoped>
.open-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
