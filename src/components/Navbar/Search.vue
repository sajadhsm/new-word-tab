<template>
  <div class="search">
    <IconButton v-if="!isVisible" title="Search word" @click="isVisible = true">
      <i-ic-round-search />
    </IconButton>

    <form v-else class="search__form" @submit.prevent="handleSearch">
      <input
        ref="inputRef"
        v-model="query"
        class="search__form__input"
        placeholder="Search word"
        type="search"
      />
      <button type="submit" class="search__form__btn">
        <i-ic-round-search />
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import IconButton from '@/components/shared/IconButton.vue';

import useWord from '@/composables/useWord';

export default {
  name: 'Search',

  components: {
    IconButton,
  },

  setup() {
    const query = ref('');
    const lastQuery = ref('');
    const inputRef = ref(null);
    const isVisible = ref(false);
    const { searchWord } = useWord();

    const canSearch = computed(
      () => query.value && query.value !== lastQuery.value
    );

    function handleSearch() {
      if (canSearch.value) {
        lastQuery.value = query.value;
        searchWord(query.value);
      }

      if (!query.value) {
        isVisible.value = false;
      }
    }

    // Auto focus on search input when it is visible
    watch(inputRef, (el) => el?.focus());

    return {
      handleSearch,
      isVisible,
      inputRef,
      query,
    };
  },
};
</script>

<style>
.search__form {
  display: flex;
  border-radius: 30px;
  background-color: hsla(var(--color-raw), 0.15);
}

.search__form__input {
  padding: 4px 10px;
  max-width: 150px;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--color);
  font-size: 1rem;
}

.search__form__btn {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  color: var(--color);
  font-size: 1rem;
  opacity: 0.5;
}
</style>
