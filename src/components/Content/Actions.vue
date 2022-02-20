<template>
  <div class="actions">
    <IconButton title="Mark as learned" @click="handleMarkAsLearned">
      <i-ic-round-check-circle />
    </IconButton>

    <IconButton title="Mark Word" class="btn-gap" @click="handleMarkWord">
      <i-ic-round-bookmark-add />
    </IconButton>

    <IconButton
      :title="`Google translate (${targetLanguage.lang})`"
      :href="`https://translate.google.com/?sl=en&tl=${targetLanguage.code}&text=${definition.word}&op=translate`"
      target="_blank"
      class="btn-gap"
    >
      <i-ic-round-g-translate />
    </IconButton>

    <div v-if="phonetic" class="phonetic">
      <small v-if="phonetic.text" class="phonetic__text">
        {{ phonetic.text }}
      </small>
      <IconButton v-if="phonetic.audio" title="Listen" @click="handleListen">
        <i-ic-round-volume-up />
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import audio from '@/modules/audio';

import IconButton from '@/components/shared/IconButton.vue';

import useMarkedWords from '@/composables/words/useMarkedWords';
import useLearnedWords from '@/composables/words/useLearnedWords';
import useGoogleTranslate from '@/composables/useGoogleTranslate';

import { type IWordDefinition } from '@/composables/words/useWordDefinitions';

const props = defineProps<{
  definition: IWordDefinition;
}>();

const emit = defineEmits(['marked']);

const { setWordAsLearned } = useLearnedWords();
const { targetLanguage } = useGoogleTranslate();
const { setWordAsMarked, removeMarkedWord } = useMarkedWords();

const phonetic = computed(() => {
  const { phonetics } = props.definition;

  return (
    phonetics.find((p) => p.audio && p.text) ||
    phonetics.find((p) => p.audio) ||
    phonetics.find((p) => p.text)
  );
});

function handleMarkWord() {
  setWordAsMarked(props.definition.word);
  emit('marked');
}

function handleMarkAsLearned() {
  removeMarkedWord(props.definition.word);
  setWordAsLearned(props.definition.word);
  emit('marked');
}

function handleListen() {
  if (phonetic.value?.audio) {
    audio.setAudio(phonetic.value.audio);
    audio.playAudio();
  }
}
</script>

<style>
.actions {
  display: flex;
  align-items: center;
}

.btn-gap {
  margin-left: 8px;
}

.phonetic {
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 1.25rem;
}
.phonetic__text {
  margin-right: 6px;
}
</style>
