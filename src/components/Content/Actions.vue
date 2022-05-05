<template>
  <div class="actions">
    <IconButton
      :title="`Google translate (${targetLanguage.lang})`"
      :href="`https://translate.google.com/?sl=en&tl=${targetLanguage.code}&text=${definition.word}&op=translate`"
      target="_blank"
    >
      <i-ic-round-g-translate />
    </IconButton>

    <IconButton title="Ignore word">
      <i-ic-round-visibility-off />
    </IconButton>

    <IconButton title="Mark as Learning" @click="handleMarkAsLearning">
      <i-ic-round-bookmark-add />
    </IconButton>

    <!-- <IconButton title="Mark as learned" @click="handleMarkAsLearned">
      <i-ic-round-check-circle />
    </IconButton> -->
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/shared/IconButton.vue';

import useLearningWords from '@/composables/words/useLearningWords';
import useLearnedWords from '@/composables/words/useLearnedWords';
import useGoogleTranslate from '@/composables/useGoogleTranslate';

import { type IWordDefinition } from '@/composables/words/useWordDefinitions';

const props = defineProps<{
  definition: IWordDefinition;
}>();

const emit = defineEmits(['marked']);

const { setWordAsLearned } = useLearnedWords();
const { targetLanguage } = useGoogleTranslate();
const { setWordAsLearning, removeLearningWord } = useLearningWords();

function handleMarkAsLearning() {
  setWordAsLearning(props.definition.word);
  emit('marked');
}

function handleMarkAsLearned() {
  removeLearningWord(props.definition.word);
  setWordAsLearned(props.definition.word);
  emit('marked');
}
</script>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
}
</style>
