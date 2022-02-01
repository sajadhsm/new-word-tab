<template>
  <IconButton
    class="marked-words-btn"
    title="Marked Words"
    @click="isDrawerOpen = true"
  >
    <i-ic-round-bookmarks />
  </IconButton>

  <MarkedWordsDrawer :is-open="isDrawerOpen" @close="isDrawerOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MarkedWordsDrawer from './MarkedWordsDrawer.vue';
import IconButton from '../shared/IconButton.vue';

const isDrawerOpen = ref(false);
</script>

<style scoped>
.marked-words-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
