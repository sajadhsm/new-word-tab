<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="drawer">
      <div class="drawer__top">
        <div class="drawer__header">
          <h4 class="drawer__title">Marked Words</h4>

          <button class="drawer__close btn" @click="$emit('close')">
            <i-ic-round-close />
          </button>
        </div>

        <div class="drawer__filters">
          <button class="sort-btn btn" title="Sort">
            <i-fa-solid-sort-alpha-down />
            <!-- <i-fa-solid-sort-alpha-down-alt /> -->
          </button>

          <input type="search" placeholder="Search" class="search" />
        </div>
      </div>

      <ul class="marked-words tiny-scrollbar">
        <li v-for="word of markedWords" :key="word" class="marked-word">
          {{ word }}

          <div class="actions">
            <button title="Check definition" class="btn">
              <i-ic-round-remove-red-eye />
            </button>

            <button title="Mark as Learned" class="btn">
              <i-ic-round-check-circle-outline />
            </button>

            <button title="Remove from list" class="btn">
              <i-ic-round-remove-circle-outline />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useMarkedWords from '@/composables/useMarkedWords';

export default {
  name: 'MarkedWordsDrawer',

  emits: ['close'],

  setup() {
    const { getLocalMarkedWords, markedWords } = useMarkedWords();

    getLocalMarkedWords();

    return {
      markedWords,
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
  padding: 5px 10px;
  background-color: var(--bg-color);
  max-width: 350px;
  width: 100%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);

  --top-height: 65px;
}

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

.marked-words {
  padding: 0;
  list-style: none;
  font-size: 1rem;
  max-height: calc(100vh - (var(--top-height) + 40px));
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
</style>
