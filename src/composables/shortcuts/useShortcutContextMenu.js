import { ref, watchEffect } from 'vue';

import { useClickOutside } from '../useClickOutside';

const contextMenuRef = ref(null);
const isClickOutsideSet = ref(false);

export const isVisible = ref(false);
export const selectedShortcut = ref(null);

export default function useShortcutContextMenu() {
  watchEffect(
    () => {
      if (!isClickOutsideSet.value) {
        useClickOutside(contextMenuRef, () => (isVisible.value = false));
        isClickOutsideSet.value = true;
      }
    },
    { flush: 'post' }
  );

  function openContextMenu(event, shortcut) {
    const target = getShortcutElement(event.target);
    const { y } = target.getBoundingClientRect();

    const offset = y + 15;
    contextMenuRef.value.style.top = `${offset}px`;

    isVisible.value = true;
    selectedShortcut.value = shortcut;
  }

  function closeContextMenu({ clearShortcut = true } = {}) {
    isVisible.value = false;

    if (clearShortcut) {
      selectedShortcut.value = null;
    }
  }

  return {
    isVisible,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
    selectedShortcut,
  };
}

function getShortcutElement(target) {
  if (target && target.className === 'shortcut') {
    return target;
  }

  return getShortcutElement(target.parentNode);
}
