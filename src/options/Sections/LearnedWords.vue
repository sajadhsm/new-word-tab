<template>
  <Section
    title="Learned words"
    description='These are the words that you have marked as "Learned". you can remove them from the list, so they will reappear in a new tab.'
    column
  >
    <ul v-if="learnedWords.length" class="learned-words">
      <li v-for="word of learnedWords" :key="word" class="word-row">
        <b class="word-row__word">{{ word }}</b>
        <button
          class="word-row__remove-btn"
          title="Remove from list"
          @click="removeLearnedWord(word)"
        >
          <i-ic-round-remove-circle-outline />
        </button>
      </li>
    </ul>
    <p v-else class="no-learned-word">No learned word yet! 📭</p>
  </Section>
</template>

<script setup lang="ts">
import Section from '../components/Section.vue';

import useLearnedWords from '@/composables/words/useLearnedWords';

const { learnedWords, getLocalLearnedWords, removeLearnedWord } =
  useLearnedWords();

getLocalLearnedWords();
</script>

<style>
.learned-words {
  list-style: none;
  padding: 5px 0;

  border: 1px solid #ddd;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 4px;
}

.word-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  font-size: 1rem;
}
.word-row:hover {
  background: #eee;
}
.word-row__word {
  text-transform: capitalize;
}
.word-row__remove-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.25;
}
.word-row__remove-btn:hover {
  opacity: 1;
}

.no-learned-word {
  padding: 1rem 0;
  text-align: center;
  font-size: 1.25rem;
  color: hsl(0, 0%, 50%);
}
</style>
