<template>
  <div class="content">
    <div class="title" :class="backgroundClass">
      <div class="title__word-actions">
        <h1 class="word">{{ word }}</h1>

        <Actions
          v-if="definition"
          :definition="definition"
          @marked="$emit('marked')"
        />
      </div>

      <Phonetic :definition="definition" />
    </div>

    <div v-if="definition" class="meanings">
      <div
        v-for="(meaning, index) of definition.meanings"
        :key="index"
        :class="backgroundClass"
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

<script setup lang="ts">
import { computed } from 'vue';

import Actions from './Actions.vue';
import Phonetic from './Phonetic.vue';

import useBackground from '@/composables/useBackground';
import type { IWordDefinition } from '@/composables/words/useWordDefinitions';

const props = defineProps<{
  word: string;
  definitions: IWordDefinition[];
}>();

defineEmits(['marked']);

const { shouldModifyUI } = useBackground();

const definition = computed(() => props.definitions?.[0]);

const backgroundClass = computed(() => ({ boxed: shouldModifyUI.value }));
</script>

<style scoped>
.content {
  margin: 100px auto 50px;
  padding: 0 15px;
  max-width: 800px;
}

.title {
  margin-bottom: 20px;
}

.title__word-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.word {
  margin: 0;
  font-size: 4rem;
  text-transform: capitalize;
}

@media all and (max-width: 450px) {
  .word {
    font-size: 2.5rem;
  }
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
  font-size: 0.75rem;
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
  font-size: 0.75rem;
}

.meaning__def::first-letter,
.meaning__example::first-letter {
  text-transform: uppercase;
}

.boxed {
  padding: 15px 20px;
  border-radius: 10px;
  background-color: hsla(var(--bg-color-raw), 0.9);
  backdrop-filter: blur(5px);
}
</style>
