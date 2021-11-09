<template>
  <ul v-show="isVisible" ref="contextMenuRef" class="shortcut-context-menu">
    <li @click="handleEdit">Edit</li>
    <li @click="handleRemove">Remove</li>
  </ul>
</template>

<script>
import useShortcuts from '@/composables/useShortcuts';
import useShortcutModal from '@/composables/useShortcutModal';
import useShortcutContextMenu from '@/composables/useShortcutContextMenu';

export default {
  name: 'ShortcutContextMenu',

  setup() {
    const { openModal } = useShortcutModal();
    const { removeShortcut } = useShortcuts();
    const { isVisible, contextMenuRef, selectedShortcut, closeContextMenu } =
      useShortcutContextMenu();

    function handleRemove() {
      removeShortcut(selectedShortcut.value.url);
      closeContextMenu();
    }

    function handleEdit() {
      openModal(selectedShortcut);
    }

    return {
      handleRemove,
      handleEdit,

      contextMenuRef,
      isVisible,
    };
  },
};
</script>

<style scoped>
.shortcut-context-menu {
  position: fixed;
  top: 25px;
  left: 25px;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  border-radius: 5px;
  background: var(--bg-color);
  border: 1px solid hsla(var(--color-raw), 0.15);
}
.shortcut-context-menu li {
  min-width: 75px;
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
}
.shortcut-context-menu li:hover {
  background: hsla(var(--color-raw), 0.15);
}
</style>
