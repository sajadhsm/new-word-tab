<template>
  <aside class="pages-shortcut">
    <a
      v-for="(shortcut, index) of shortcuts"
      :key="index"
      :href="shortcut.url"
      :title="shortcut.name"
      class="shortcut"
    >
      {{ shortcut.name[0] }}
    </a>

    <button
      class="shortcut-add"
      title="Add shortcut"
      @click="isAddShortcutModalVisible = true"
    >
      <i-ic-round-plus />
    </button>
  </aside>

  <AddShortcutModal
    v-if="isAddShortcutModalVisible"
    @close="isAddShortcutModalVisible = false"
  />
</template>

<script>
import { ref } from 'vue';

import useShortcuts from '@/composables/useShortcuts';

import AddShortcutModal from './AddShortcutModal.vue';

export default {
  name: 'SiteShortcuts',

  components: { AddShortcutModal },

  setup() {
    const isAddShortcutModalVisible = ref(false);

    const { shortcuts } = useShortcuts();

    return {
      isAddShortcutModalVisible,
      shortcuts,
    };
  },
};
</script>

<style>
.pages-shortcut {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 10px;
  background-color: hsla(var(--color-raw), 0.1);
  backdrop-filter: blur(10px);
}

.shortcut-add {
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 1px solid hsla(var(--color-raw), 0.3);
  border-radius: 5px;
  color: hsla(var(--color-raw), 0.5);
}
.shortcut-add:hover {
  background-color: hsla(var(--color-raw), 0.1);
}

.shortcut {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid hsla(var(--color-raw), 0.3);
  border-radius: 5px;
  color: var(--color);
  text-decoration: none;
  text-transform: uppercase;
}
</style>
