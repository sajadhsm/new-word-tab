<template>
  <Draggable
    v-model="shortcuts"
    :animation="200"
    item-key="url"
    ghost-class="shortcut--ghost"
    @end="saveShortcutsToStorage"
  >
    <template #item="{ element }">
      <Shortcut :shortcut="element" :on-context-menu="onContextMenu" />
    </template>
  </Draggable>
</template>

<script>
import Draggable from 'vuedraggable';

import Shortcut from './Shortcut.vue';

import useShortcuts from '@/composables/useShortcuts';

export default {
  name: 'Shortcuts',

  components: {
    Draggable,
    Shortcut,
  },

  props: {
    onContextMenu: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const { shortcuts, saveShortcutsToStorage } = useShortcuts();

    return {
      shortcuts,
      saveShortcutsToStorage,
    };
  },
};
</script>

<style scoped>
.shortcut--ghost {
  opacity: 0.5;
}
</style>
