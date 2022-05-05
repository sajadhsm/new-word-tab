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

    <slot v-if="!list.length" name="empty">
      <p class="state-message">
        <i-ic-round-inbox />
        <br />
        There is nothing to show
      </p>
    </slot>

    <p v-else-if="!filteredWords.length" class="state-message">
      <i-ic-round-search-off />
      <br />
      No word matched
    </p>

    <ul v-else class="list">
      <li v-for="word of filteredWords" :key="word" class="row">
        {{ word }}
        <div class="actions">
          <slot name="actions" :word="word" />
        </div>
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

.list {
  list-style: none;
  padding: 0;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 10px;
  border-radius: 4px;
  text-transform: capitalize;
}

.row:hover {
  background-color: hsla(var(--color-raw), 0.1);
}

.actions {
  display: flex;
  gap: 5px;
}

.state-message {
  margin-top: 50px;
  font-size: 1rem;
  text-align: center;
}
.state-message svg {
  font-size: 1.5rem;
}
</style>
