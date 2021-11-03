<template>
  <div class="search">
    <NavButton v-if="!isVisible" title="Search word" @click="isVisible = true">
      <i-ic-round-search />
    </NavButton>

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

import NavButton from './NavButton.vue';

import useWord from '@/composables/useWord';

export default {
  name: 'Search',

  components: {
    NavButton,
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
  background-color: hsla(var(--color-raw), 0.15);
  border-radius: 30px;
}

.search__form__input {
  padding: 7px 10px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  max-width: 150px;
  color: var(--color);
}

.search__form__btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: var(--color);
  opacity: 0.5;
}
</style>
