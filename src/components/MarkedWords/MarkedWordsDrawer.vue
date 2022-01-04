<template>
  <transition name="fade" @after-enter="handleShowDrawer">
    <div v-if="isOpen" class="overlay" @click.self="handleCloseDrawer">
      <transition name="slide" @after-leave="$emit('close')">
        <div v-show="isShowingDrawer" class="drawer">
          <div class="drawer__top">
            <div class="drawer__header">
              <h4 class="drawer__title">Marked Words</h4>

              <button
                class="btn drawer__close"
                title="Close"
                @click="handleCloseDrawer"
              >
                <i-ic-round-close />
              </button>
            </div>

            <div class="drawer__filters">
              <button
                class="btn sort-btn"
                :title="`Sort (${isAscending ? 'Ascending' : 'Descending'})`"
                :disabled="!markedWords.length"
                @click="isAscending = !isAscending"
              >
                <i-fa-solid-sort-alpha-down v-if="isAscending" />
                <i-fa-solid-sort-alpha-down-alt v-else />
              </button>

              <input
                ref="inputRef"
                v-model="searchQuery"
                type="search"
                placeholder="Search"
                class="search"
                :disabled="!markedWords.length"
              />
            </div>
          </div>

          <p v-if="!markedWords.length" class="empty-state">
            You don't have any marked words yet.
            <br />
            Mark a word using
            <i-ic-round-bookmark-add class="empty-state-icon" /> icon.
          </p>

          <p v-else-if="!filteredWords.length" class="search-not-found">
            <i-ic-round-search-off />
            <br />
            No word matched!
          </p>

          <ul v-else class="marked-words tiny-scrollbar">
            <li v-for="word of filteredWords" :key="word" class="marked-word">
              {{ word }}

              <div class="actions">
                <button
                  title="Check definition"
                  class="btn"
                  @click="handleCheckDefinition(word)"
                >
                  <i-ic-round-remove-red-eye />
                </button>

                <button
                  title="Mark as Learned"
                  class="btn"
                  @click="handleMarkAsLearned(word)"
                >
                  <i-ic-round-check-circle-outline />
                </button>

                <button
                  title="Remove from list"
                  class="btn"
                  @click="handleRemoveMarkedWord(word)"
                >
                  <i-ic-round-remove-circle-outline />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref, computed } from 'vue';

import useWord from '@/composables/words/useWord';
import useMarkedWords from '@/composables/words/useMarkedWords';
import useLearnedWords from '@/composables/words/useLearnedWords';

export default {
  name: 'MarkedWordsDrawer',

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['close'],

  setup() {
    const { searchWord } = useWord();
    const { setWordAsLearned } = useLearnedWords();
    const { getLocalMarkedWords, removeMarkedWord, markedWords } =
      useMarkedWords();

    const inputRef = ref(null);
    const isShowingDrawer = ref(false);

    const searchQuery = ref('');
    const isAscending = ref(true);

    const filteredWords = computed(() => {
      return markedWords.value
        .filter((word) => word.includes(searchQuery.value))
        .sort((a, b) =>
          isAscending.value ? a.localeCompare(b) : b.localeCompare(a)
        );
    });

    function handleCheckDefinition(word) {
      searchWord(word);
      handleCloseDrawer();
    }

    function handleMarkAsLearned(word) {
      setWordAsLearned(word);
      handleRemoveMarkedWord(word);
    }

    function handleRemoveMarkedWord(word) {
      removeMarkedWord(word);
    }

    function handleShowDrawer() {
      getLocalMarkedWords();
      isShowingDrawer.value = true;
      setTimeout(() => inputRef.value.focus(), 0);
    }

    function handleCloseDrawer() {
      isShowingDrawer.value = false;
    }

    return {
      inputRef,
      isShowingDrawer,
      handleShowDrawer,
      handleCloseDrawer,

      isAscending,
      markedWords,
      searchQuery,
      filteredWords,
      handleMarkAsLearned,
      handleCheckDefinition,
      handleRemoveMarkedWord,
    };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2;
}
.drawer {
  position: absolute;
  right: 0;
  height: 100vh;
  padding: 10px 15px;
  background-color: var(--bg-color);
  max-width: 350px;
  width: 100%;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.3);

  --top-height: 65px;
}

/* START Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.08s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
/* END Animations */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: var(--color);
  background-color: transparent;
}

.drawer__top {
  height: var(--top-height);
}

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 15px;
}

.drawer__title {
  margin: 0;
  font-size: 1rem;
}

.drawer__close {
  font-size: 1.25rem;
  color: hsla(var(--color-raw), 0.5);
  background-color: hsla(var(--color-raw), 0.1);
  border-radius: 4px;
}
.drawer__close:hover {
  transition: background-color ease-in-out 0.13s;
  background-color: hsla(var(--color-raw), 0.2);
}

.drawer__filters {
  display: flex;
  align-items: center;
}

.sort-btn {
  margin-right: 10px;
  font-size: 1rem;
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

.marked-words {
  padding: 0;
  list-style: none;
  font-size: 1rem;
  max-height: calc(100vh - (var(--top-height) + 45px));
}

.marked-word {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: capitalize;
}
.marked-word:hover {
  background: hsla(var(--color-raw), 0.05);
}

.actions button {
  margin-right: 4px;
  padding: 2px;
  color: hsla(var(--color-raw), 0.25);
}
.actions button:hover {
  transition: color ease-in-out 0.1s;
  color: var(--color);
}

.actions button:last-of-type {
  margin: 0;
}

.empty-state {
  margin-top: 50px;
  font-size: 1rem;
  text-align: center;
}
.empty-state-icon {
  position: relative;
  top: 5px;
}

.search-not-found {
  margin-top: 50px;
  font-size: 1rem;
  text-align: center;
}
.search-not-found svg {
  font-size: 1.5rem;
}
</style>
