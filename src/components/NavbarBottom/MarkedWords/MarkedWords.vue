<template>
  <IconButton
    class="marked-words-btn"
    title="Marked Words"
    @click="isDrawerOpen = true"
  >
    <i-ic-round-bookmarks />
  </IconButton>

  <Drawer title="Marked Words" :is-open="isDrawerOpen" @close="closeDrawer">
    <Tabs @show-definition="handleShowDefinition" />
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import useWord from '@/composables/words/useWord';

import IconButton from '@/components/shared/IconButton.vue';
import Drawer from '@/components/shared/Drawer.vue';
import Tabs from './Tabs.vue';

const { searchWord } = useWord();

const isDrawerOpen = ref(false);

const handleShowDefinition = (word: string) => {
  searchWord(word);
  closeDrawer();
};

const closeDrawer = () => (isDrawerOpen.value = false);
</script>
