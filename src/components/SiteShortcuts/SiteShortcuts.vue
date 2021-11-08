<template>
  <aside v-if="isActive" class="shortcuts">
    <Shortcuts />

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

import Shortcuts from './Shortcuts.vue';
import AddShortcutModal from './AddShortcutModal.vue';

export default {
  name: 'SiteShortcuts',

  components: {
    Shortcuts,
    AddShortcutModal,
  },

  setup() {
    const { isActive } = useShortcuts();
    const isAddShortcutModalVisible = ref(false);

    return {
      isAddShortcutModalVisible,
      isActive,
    };
  },
};
</script>

<style>
.shortcuts {
  flex-shrink: 0;
  min-height: 100vh;
  padding: 10px 5px;
  background-color: hsla(var(--color-raw), 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  /* firefox */
  overflow-x: hidden;
  scrollbar-color: hsla(var(--color-raw), 0.2) hsla(var(--color-raw), 0.1);
  scrollbar-width: thin;
}
.shortcuts::-webkit-scrollbar {
  width: 4px;
}
.shortcuts::-webkit-scrollbar-track {
  background-color: hsla(var(--color-raw), 0.1);
}
.shortcuts::-webkit-scrollbar-thumb {
  background-color: hsla(var(--color-raw), 0.2);
}

.shortcut,
.shortcut-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: hsla(var(--color-raw), 0.5);
  transition: background-color ease-in-out 0.1s;
}
.shortcut:hover,
.shortcut-add:hover {
  background-color: hsla(var(--color-raw), 0.15);
}

.shortcut-add {
  font-size: 2rem;
}
</style>
