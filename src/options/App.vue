<template>
  <div class="options">
    <h1>Options</h1>
    <hr />

    <div class="op-section">
      <h2 class="op-section__title">Learned words</h2>
      <p class="op-section__subtitle">
        These are the words that you have marked as "Learned". You can remove
        them from the list, so they will reappear in a new tab.
      </p>

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
    </div>
  </div>
</template>

<script>
import useLearnedWords from '@/composables/useLearnedWords';

export default {
  setup() {
    const { learnedWords, getLocalLearnedWords, removeLearnedWord } =
      useLearnedWords();

    getLocalLearnedWords();

    return { learnedWords, removeLearnedWord };
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.options {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 10px;
}

.op-section__title {
  margin-bottom: 5px;
}
.op-section__subtitle {
  margin-top: 0;
}

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
