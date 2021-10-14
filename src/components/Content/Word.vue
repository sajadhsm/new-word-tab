<template>
  <div class="content">
    <div class="title">
      <h1 class="word">{{ word }}</h1>

      <Actions
        v-if="definition"
        :definition="definition"
        @learned="$emit('learned')"
      />
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

import Actions from './Actions.vue';

export default {
  name: 'Word',

  components: { Actions },

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

  emits: ['learned'],

  setup(props) {
    const definition = computed(() => props.definitions?.[0]);

    return { definition };
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
