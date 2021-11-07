<template>
  <aside v-if="isActive" class="shortcuts">
    <a
      v-for="(shortcut, index) of shortcuts"
      :key="index"
      :href="shortcut.url"
      :title="shortcut.name"
      class="shortcut"
    >
      <img
        v-if="shortcut.hostname"
        :src="`https://icons.duckduckgo.com/ip2/${shortcut.hostname}.ico`"
        :alt="shortcut.name"
        width="16"
        height="16"
        class="shortcut__favicon"
      />
      <i-ph-circle-dashed-bold v-else class="shortcut__no-favicon" />
      <small class="shortcut__text">{{ shortcut.name }}</small>
    </a>

    <button
      class="shortcut-add"
      title="Add shortcut"
      @click="isAddShortcutModalVisible = true"
    >
      <i-ic-round-plus />
    </button>
  </aside>

  <AddShortcutModal
    v-if="isAddShortcutModalVisible"
    @close="isAddShortcutModalVisible = false"
  />
</template>

<script>
import { ref } from 'vue';

import useShortcuts from '@/composables/useShortcuts';

import AddShortcutModal from './AddShortcutModal.vue';

export default {
  name: 'SiteShortcuts',

  components: { AddShortcutModal },

  setup() {
    const isAddShortcutModalVisible = ref(false);

    const { shortcuts, isActive } = useShortcuts();

    return {
      isAddShortcutModalVisible,
      shortcuts,
      isActive,
    };
  },
};
</script>

<style>
.shortcuts {
  flex-shrink: 0;
  min-height: 100vh;
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

.shortcut {
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px;
  text-decoration: none;
}

.shortcut-add {
  font-size: 2rem;
}

.shortcut__favicon {
  margin-bottom: 4px;
}
.shortcut__no-favicon {
  margin-bottom: 4px;
  font-size: 16px;
  color: hsla(var(--color-raw), 0.35);
}

.shortcut__text {
  max-width: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.6rem;
  color: hsla(var(--color-raw), 0.75);
}
</style>
