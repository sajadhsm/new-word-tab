import { ref } from 'vue';

import { useClickOutside } from './useClickOutside';

const isVisible = ref(false);

export default function useShortcutContextMenu(menuRef) {
  useClickOutside(menuRef, () => (isVisible.value = false));

  function openContextMenu(event) {
    const target = getShortcutElement(event.target);
    const { y } = target.getBoundingClientRect();

    const offset = y + 15;
    menuRef.value.$el.style.top = `${offset}px`;

    isVisible.value = true;
  }

  return {
    isVisible,
    openContextMenu,
  };
}

function getShortcutElement(target) {
  if (target && target.className === 'shortcut') {
    return target;
  }

  return getShortcutElement(target.parentNode);
}
