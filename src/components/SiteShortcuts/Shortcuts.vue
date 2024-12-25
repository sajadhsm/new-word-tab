<script lang="ts">
import { defineComponent } from 'vue'

import Draggable from 'vuedraggable'

import Shortcut from './Shortcut.vue'

import useShortcuts from '@/composables/shortcuts/useShortcuts'
import useShortcutContextMenu from '@/composables/shortcuts/useShortcutContextMenu'

export default defineComponent({
  name: 'Shortcuts',

  components: {
    Draggable,
    Shortcut,
  },

  setup() {
    const { shortcuts, saveShortcutsToStorage } = useShortcuts()
    const { openContextMenu } = useShortcutContextMenu()

    return {
      shortcuts,
      openContextMenu,
      saveShortcutsToStorage,
    }
  },
})
</script>

<template>
  <Draggable
    v-model="shortcuts"
    :animation="200"
    item-key="url"
    ghost-class="shortcut--ghost"
    @end="saveShortcutsToStorage"
  >
    <template #item="{ element }">
      <Shortcut :shortcut="element" :on-context-menu="openContextMenu" />
    </template>
  </Draggable>
</template>

<style scoped>
.shortcut--ghost {
  opacity: 0.5;
}
</style>
