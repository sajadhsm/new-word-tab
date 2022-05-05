<template>
  <IconButton
    class="marked-words-btn"
    title="Marked Words"
    @click="isDrawerOpen = true"
  >
    <i-ic-round-bookmarks />
  </IconButton>

  <Drawer
    title="Marked Words"
    :is-open="isDrawerOpen"
    @close="isDrawerOpen = false"
  >
    <Tabs />
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconButton from '../shared/IconButton.vue';
import Drawer from '../shared/Drawer.vue';
import Tabs from './Tabs.vue';

const isDrawerOpen = ref(false);
</script>

<style scoped>
.marked-words-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
