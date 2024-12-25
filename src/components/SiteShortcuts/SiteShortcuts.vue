<script lang="ts" setup>
import { computed } from 'vue'

import Shortcuts from './Shortcuts.vue'
import AddShortcutForm from './AddShortcutForm.vue'
import ShortcutContextMenu from './ShortcutContextMenu.vue'
import Modal from '@/components/shared/Modal.vue'

import {
  isVisible,
  selectedShortcut,
} from '@/composables/shortcuts/useShortcutContextMenu'
import useShortcutModal from '@/composables/shortcuts/useShortcutModal'
import useBackground from '@/composables/useBackground'

const { isModalVisible, openModal, closeModal } = useShortcutModal()

const { shouldModifyUI } = useBackground()

const backgroundClass = computed(() => ({
  'shortcuts--filled': shouldModifyUI.value,
}))

function hideShortcutContextMenuOnScroll() {
  if (isVisible.value) {
    isVisible.value = false
  }
}
</script>

<template>
  <aside
    :class="backgroundClass"
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

<style>
.shortcuts {
  position: fixed;
  height: 100%;
  padding: 10px 5px;
  background-color: hsla(var(--color-raw), 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* firefox */
  overflow-x: hidden;
}

.shortcuts--filled {
  background-color: hsla(var(--bg-color-raw), 0.8);
  backdrop-filter: blur(5px);
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
