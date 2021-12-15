<template>
  <aside
    class="shortcuts tiny-scrollbar"
    @scroll="hideShortcutContextMenuOnScroll"
  >
    <Shortcuts />

    <button class="shortcut-add" title="Add shortcut" @click="openModal">
      <i-ic-round-plus />
    </button>
  </aside>

  <ShortcutContextMenu />

  <Modal
    v-model="isModalVisible"
    :title="selectedShortcut ? 'Edit shortcut' : 'Add shortcut'"
    :show-close="false"
    :close-on-overlay="false"
  >
    <AddShortcutForm @submit="closeModal" @cancel="closeModal" />
  </Modal>
</template>

<script>
import Modal from '@/components/shared/Modal.vue';
import Shortcuts from './Shortcuts.vue';
import AddShortcutForm from './AddShortcutForm.vue';
import ShortcutContextMenu from './ShortcutContextMenu.vue';

import {
  isVisible,
  selectedShortcut,
} from '@/composables/useShortcutContextMenu';
import useShortcutModal from '@/composables/useShortcutModal';

export default {
  name: 'SiteShortcuts',

  components: {
    Modal,
    Shortcuts,
    AddShortcutForm,
    ShortcutContextMenu,
  },

  setup() {
    const { isModalVisible, openModal, closeModal } = useShortcutModal();

    function hideShortcutContextMenuOnScroll() {
      if (isVisible.value) {
        isVisible.value = false;
      }
    }

    return {
      hideShortcutContextMenuOnScroll,
      isVisible,

      selectedShortcut,
      isModalVisible,
      closeModal,
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
  /* firefox */
  overflow-x: hidden;
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
