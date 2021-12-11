<template>
  <IconButton
    class="marked-words-btn"
    title="Marked Words"
    @click="isDrawerOpen = true"
  >
    <i-ic-round-bookmarks />
  </IconButton>

  <MarkedWordsDrawer v-if="isDrawerOpen" @close="isDrawerOpen = false" />
</template>

<script>
import { ref } from 'vue';

import MarkedWordsDrawer from './MarkedWordsDrawer.vue';
import IconButton from '../shared/IconButton.vue';

export default {
  name: 'MarkedWords',

  components: { MarkedWordsDrawer, IconButton },

  setup() {
    const isDrawerOpen = ref(false);

    return {
      isDrawerOpen,
    };
  },
};
</script>

<style scoped>
.marked-words-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
