import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

import { useClickOutside } from '../useClickOutside'

import type { Shortcut } from './useShortcuts'

const contextMenuRef: Ref<HTMLElement | null> = ref(null)
const isClickOutsideSet = ref(false)

export const isVisible = ref(false)
export const selectedShortcut: Ref<Shortcut | null> = ref(null)

export default function useShortcutContextMenu() {
  watchEffect(
    () => {
      if (!isClickOutsideSet.value) {
        useClickOutside(contextMenuRef, () => (isVisible.value = false))
        isClickOutsideSet.value = true
      }
    },
    { flush: 'post' },
  )

  function openContextMenu(event: MouseEvent, shortcut: Shortcut) {
    if (!event.target)
      return

    const target = getShortcutElement(event.target as HTMLElement)
    const { y } = target.getBoundingClientRect()

    if (contextMenuRef.value) {
      const offset = y + 15
      contextMenuRef.value.style.top = `${offset}px`
    }

    isVisible.value = true
    selectedShortcut.value = shortcut
  }

  function closeContextMenu({ clearShortcut = true } = {}) {
    isVisible.value = false

    if (clearShortcut) {
      selectedShortcut.value = null
    }
  }

  return {
    isVisible,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
    selectedShortcut,
  }
}

function getShortcutElement(target: HTMLElement): HTMLElement {
  if (target && target.className === 'shortcut') {
    return target
  }

  return getShortcutElement(target.parentNode as HTMLElement)
}
