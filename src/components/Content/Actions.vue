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

    <div v-if="definition?.phonetic" class="phonetic">
      <small class="phonetic__text">/{{ definition.phonetic }}/</small>
      <IconButton title="Listen" @click="handleListen">
        <i-ic-round-volume-up />
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import audio from '@/modules/audio';

import IconButton from '@/components/shared/IconButton.vue';

import useMarkedWords from '@/composables/words/useMarkedWords';
import useLearnedWords from '@/composables/words/useLearnedWords';
import useGoogleTranslate from '@/composables/useGoogleTranslate';

const props = defineProps({
  definition: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['marked']);

const { setWordAsLearned } = useLearnedWords();
const { targetLanguage } = useGoogleTranslate();
const { setWordAsMarked, removeMarkedWord } = useMarkedWords();

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
  audio.setAudio(props.definition.phonetics[0].audio);
  audio.playAudio();
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
