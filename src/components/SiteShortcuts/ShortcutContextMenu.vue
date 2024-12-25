<script lang="ts">
import useShortcutContextMenu from '@/composables/shortcuts/useShortcutContextMenu'

import useShortcutModal from '@/composables/shortcuts/useShortcutModal'
import useShortcuts from '@/composables/shortcuts/useShortcuts'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShortcutContextMenu',

  setup() {
    const { openModal } = useShortcutModal()
    const { removeShortcut } = useShortcuts()
    const { isVisible, contextMenuRef, selectedShortcut, closeContextMenu }
      = useShortcutContextMenu()

    function handleRemove() {
      if (selectedShortcut.value) {
        removeShortcut(selectedShortcut.value.name)
      }
      closeContextMenu()
    }

    function handleEdit() {
      openModal()
      closeContextMenu({ clearShortcut: false })
    }

    return {
      handleRemove,
      handleEdit,

      contextMenuRef,
      isVisible,
    }
  },
})
</script>

<template>
  <ul v-show="isVisible" ref="contextMenuRef" class="shortcut-context-menu">
    <li @click="handleEdit">
      Edit shortcut
    </li>
    <li @click="handleRemove">
      Remove
    </li>
  </ul>
</template>

<style scoped>
.shortcut-context-menu {
  position: fixed;
  top: 25px;
  left: 25px;
  list-style: none;
  margin: 0;
  padding: 5px 0;
  border-radius: 5px;
  background: var(--bg-color);
  border: 1px solid hsla(var(--color-raw), 0.15);
  box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.shortcut-context-menu li {
  padding: 7px 15px;
  font-size: 0.75rem;
  cursor: pointer;
}
.shortcut-context-menu li:hover {
  background: hsla(var(--color-raw), 0.1);
}
</style>
