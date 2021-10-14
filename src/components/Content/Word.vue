<template>
  <div class="content">
    <div class="title">
      <h1 class="word">{{ word }}</h1>

      <div v-if="definition?.phonetic" class="phonetic">
        <small class="phonetic__text">{{ definition.phonetic }}</small>
        <button
          class="phonetic__listen-btn"
          title="Listen"
          @click="handleListen"
        >
          <i-ic:round-volume-up />
        </button>
      </div>
    </div>

    <div v-if="definition" class="meanings">
      <div
        v-for="(meaning, index) of definition.meanings"
        :key="index"
        class="meaning"
      >
        <b class="meaning__pts">
          {{ meaning.partOfSpeech }}
        </b>

        <div v-for="(def, defIndex) of meaning.definitions" :key="defIndex">
          <p class="meaning__def">{{ def.definition }}</p>
          <p class="meaning__example">{{ def.example }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import audio from '@/modules/audio';

export default {
  name: 'Word',

  props: {
    word: {
      type: String,
      required: true,
    },

    definitions: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const definition = computed(() => props.definitions[0]);

    const handleListen = () => {
      audio.setAudio(definition.value.phonetics[0].audio);
      audio.playAudio();
    };

    return {
      handleListen,
      definition,
    };
  },
};
</script>

<style>
.content {
  margin: 100px auto 50px;
  padding: 0 15px;
  max-width: 800px;
}

.title {
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
}

.word {
  margin: 0;
  font-size: 4rem;
  text-transform: capitalize;
}

.phonetic {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
}
.phonetic__text {
  margin-right: 5px;
}
.phonetic__listen-btn {
  background-color: transparent;
  border: none;
  color: var(--color);
  outline: none;
}
.phonetic__listen-btn svg {
  font-size: 1.5rem;
}

.meaning:not(:last-of-type) {
  margin-bottom: 2rem;
}

.meaning__pts {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: hsl(0, 0%, 25%);
  color: hsl(0, 0%, 90%);
  text-transform: capitalize;
}

.meaning__def {
  margin-bottom: 5px;
  font-size: 1rem;
  color: var(--def-color);
}

.meaning__example {
  margin: 0;
  color: hsl(0, 0%, 55%);
}

.meaning__def::first-letter,
.meaning__example::first-letter {
  text-transform: uppercase;
}
</style>
