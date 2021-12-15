<template>
  <ul class="list tiny-scrollbar">
    <li
      v-for="(entry, key) in wordLists"
      :key="key"
      @click="handleOpenList(key)"
    >
      <div class="list-name">
        {{ entry.name }}

        <i-ic-round-arrow-forward-ios
          class="list-name__arrow"
          :class="{ 'list-name__arrow--open': openListName === key }"
        />
      </div>

      <ul v-if="openListName === key">
        <li
          v-for="word of openList"
          :key="word"
          class="word"
          @click="handleCheckDefinition(word)"
        >
          {{ word }}
          <i-ic-round-remove-red-eye class="check-btn" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';

import useWord from '@/composables/useWord';

import WORD_LISTS from '@/data/words';

export default {
  name: 'WordsList',

  emits: ['check'],

  setup(props, { emit }) {
    const openListName = ref(null);
    const openList = ref([]);

    function handleOpenList(name) {
      if (openListName.value === name) {
        openListName.value = null;
        openList.value = [];
      } else {
        openListName.value = name;
        openList.value = WORD_LISTS[name].list;
      }
    }

    const { searchWord } = useWord();

    function handleCheckDefinition(word) {
      searchWord(word);
      emit('check');
    }

    return {
      openList,
      openListName,
      handleOpenList,

      wordLists: WORD_LISTS,
      handleCheckDefinition,
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.list {
  margin: 0;
  height: 95%;
  max-height: 350px;
}

.list-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
}
.list-name:hover {
  background-color: hsla(var(--color-raw), 0.1);
}
.list-name:hover .list-name__arrow {
  color: var(--color);
}
.list-name__arrow {
  color: hsla(var(--color-raw), 0.25);
  transition: transform 0.13s ease-in-out;
}
.list-name__arrow--open {
  transform: rotate(90deg);
}

.word {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px 5px 23px;
  font-size: 0.8rem;
  text-transform: capitalize;
  border-radius: 4px;
  cursor: pointer;
}
.word:hover {
  background-color: hsla(var(--color-raw), 0.05);
}

.word:hover .check-btn {
  color: var(--color);
}

.check-btn {
  font-size: 1rem;
  color: hsla(var(--color-raw), 0.25);
  transition: color 0.13s ease-in-out;
}
</style>
