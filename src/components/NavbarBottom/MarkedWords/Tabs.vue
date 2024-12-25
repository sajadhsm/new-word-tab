<script lang="ts" setup>
import { ref } from 'vue'

import Learned from './Learned.vue'
import Learning from './Learning.vue'

defineEmits<{
  (e: 'showDefinition', word: string): void
}>()

const activeTab = ref('learning')
</script>

<template>
  <div>
    <ul class="navbar">
      <li
        :class="{ active: activeTab === 'learning' }"
        @click="activeTab = 'learning'"
      >
        <i-ic-round-school /> Learning
      </li>
      <li
        :class="{ active: activeTab === 'learned' }"
        @click="activeTab = 'learned'"
      >
        <i-ic-round-check-circle /> Learned
      </li>
    </ul>

    <Learned
      v-if="activeTab === 'learned'"
      @show-definition="$emit('showDefinition', $event)"
    />
    <Learning
      v-if="activeTab === 'learning'"
      @show-definition="$emit('showDefinition', $event)"
    />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 6px;
  border-radius: 6px;
  list-style: none;
  background-color: hsla(var(--color-raw), 0.05);
  font-size: 0.8rem;
}

.navbar li {
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 10px 15px;
  border-radius: 6px;
  width: 50%;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
.navbar li.active {
  background-color: hsla(var(--color-raw), 0.2);
}
.navbar li:hover:not(.active) {
  background-color: hsla(var(--color-raw), 0.1);
}
</style>
