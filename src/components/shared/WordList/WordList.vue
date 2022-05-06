<template>
  <div>
    <div v-if="!noFilters" class="top">
      <div class="filters" :style="{ flex: stretch ? '1' : '0' }">
        <button
          class="sort-btn"
          :title="`Sort (${sortStateMeta.text})`"
          :disabled="!list.length"
          @click="setNextSortState"
        >
          <component :is="sortStateMeta.icon" />
        </button>

        <input
          v-model="searchQuery"
          type="search"
          placeholder="Filter"
          class="search"
          :disabled="!list.length"
        />
      </div>

      <slot name="top-action" />
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

    <ul
      v-else
      class="list tiny-scrollbar"
      :class="{ 'list--border': border }"
      :style="{ maxHeight }"
    >
      <li
        v-for="word of filteredWords"
        :key="word"
        :style="{
          padding: dense ? '5px 10px' : '10px',
          borderRadius: border ? '0' : '4px',
          cursor: pointer ? 'pointer' : 'default',
        }"
        class="row"
        @click.self="$emit('row-click', word)"
      >
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
  dense?: boolean;
  border?: boolean;
  stretch?: boolean;
  pointer?: boolean;
  maxHeight?: string;
  noFilters?: boolean;
}>();

defineEmits<{
  (e: 'row-click', word: string): void;
}>();

const { sortStateMeta, setNextSortState } = useSort();

const searchQuery = ref('');

const filteredWords = computed(() =>
  sortStateMeta.value.sortMethod(
    props.list.filter((word) =>
      word.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
);
</script>

<style scoped>
.top,
.filters {
  display: flex;
  align-items: center;
  gap: 10px;
}
.top {
  justify-content: space-between;
}

.sort-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: var(--color);
  background-color: transparent;
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
  background-color: hsla(var(--color-raw), 0.15);
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  color: var(--color);
  font-size: 1rem;
  outline: none;
  transition: background-color ease-in-out 0.13s;
}
.search:focus,
.search:hover:not(:disabled) {
  background-color: hsla(var(--color-raw), 0.2);
}
.search::placeholder {
  color: hsla(var(--color-raw), 0.6);
}
.search:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.list {
  padding: 0;
  list-style: none;
  overflow-y: auto;
}

.list--border {
  padding: 5px 0;
  border-radius: 6px;
  border: 1px solid hsla(var(--color-raw), 0.25);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
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
