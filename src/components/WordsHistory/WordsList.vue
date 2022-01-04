<template>
  <ul class="list tiny-scrollbar">
    <li
      v-for="word of wordsHistory"
      :key="word"
      class="word"
      @click="handleCheckDefinition(word)"
    >
      {{ word }}
      <i-ic-round-remove-red-eye class="check-btn" />
    </li>
  </ul>
</template>

<script>
import useWordsHistory from '@/composables/useWordsHistory';
import useWord from '@/composables/useWord';

export default {
  name: 'WordsList',

  emits: ['check'],

  setup(props, { emit }) {
    const { wordsHistory } = useWordsHistory();
    const { searchWord } = useWord();

    function handleCheckDefinition(word) {
      searchWord(word);
      emit('check');
    }

    return {
      handleCheckDefinition,
      wordsHistory,
    };
  },
};
</script>

<style scoped>
.list {
  margin: 0;
  padding: 0;
  height: 95%;
  max-height: 350px;
  list-style: none;
}

.word {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
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
