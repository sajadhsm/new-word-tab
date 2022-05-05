<template>
  <div>
    <div class="filters">
      <button
        class="sort-btn"
        :title="`Sort (${sortStateMeta.text})`"
        :disabled="!list.length"
        @click="setNextSortState"
      >
        <component :is="sortStateMeta.icon" />
      </button>

      <input
        ref="inputRef"
        v-model="searchQuery"
        type="search"
        placeholder="Filter"
        class="search"
        :disabled="!list.length"
      />
    </div>

    <ul>
      <li v-for="word of filteredWords" :key="word">
        {{ word }}
        <div class="actions"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import useSort from '@/composables/useSort';

const props = defineProps<{
  list: string[];
}>();

const { sortStateMeta, setNextSortState } = useSort();

const inputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref('');

const filteredWords = computed(() =>
  sortStateMeta.value.sortMethod(
    props.list.filter((word) => word.includes(searchQuery.value))
  )
);
</script>

<style scoped>
.filters {
  display: flex;
  align-items: center;
}

.sort-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: var(--color);
  background-color: transparent;
  margin-right: 10px;
  font-size: 1.2rem;
  color: hsla(var(--color-raw), 0.5);
}
.sort-btn:hover:not(:disabled) {
  transition: color ease-in-out 0.1s;
  color: var(--color);
}
.sort-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.search {
  flex-grow: 1;
  background: hsla(var(--color-raw), 0.15);
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  color: var(--color);
  font-size: 1rem;
  outline: none;
}
.search::placeholder {
  color: hsla(var(--color-raw), 0.6);
}
.search:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
