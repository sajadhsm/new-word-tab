<template>
  <aside class="shortcuts" @scroll="hideShortcutContextMenuOnScroll">
    <Shortcuts />

    <button class="shortcut-add" title="Add shortcut" @click="openModal(null)">
      <i-ic-round-plus />
    </button>
  </aside>

  <ShortcutContextMenu />

  <AddShortcutModal v-if="isModalVisible" />
</template>

<script>
import useShortcutModal from '@/composables/useShortcutModal';
import { isVisible } from '@/composables/useShortcutContextMenu';

import Shortcuts from './Shortcuts.vue';
import AddShortcutModal from './AddShortcutModal.vue';
import ShortcutContextMenu from './ShortcutContextMenu.vue';

export default {
  name: 'SiteShortcuts',

  components: {
    Shortcuts,
    AddShortcutModal,
    ShortcutContextMenu,
  },

  setup() {
    const { isModalVisible, openModal } = useShortcutModal();

    function hideShortcutContextMenuOnScroll() {
      if (isVisible.value) {
        isVisible.value = false;
      }
    }

    return {
      hideShortcutContextMenuOnScroll,
      isVisible,

      isModalVisible,
      openModal,
    };
  },
};
</script>

<style>
.shortcuts {
  position: fixed;
  height: 100%;
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
