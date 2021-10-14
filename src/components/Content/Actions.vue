<template>
  <div class="actions">
    <button title="Mark as learned" @click="handleMarkAsLearned">
      <i-ic-round-beenhere />
    </button>

    <div v-if="definition?.phonetic" class="phonetic">
      <small class="phonetic__text">{{ definition.phonetic }}</small>
      <button title="Listen" @click="handleListen">
        <i-ic:round-volume-up />
      </button>
    </div>
  </div>
</template>

<script>
import audio from '@/modules/audio';

import useLearnedWord from '@/composables/useLearnedWords';

export default {
  name: 'Actions',

  props: {
    definition: {
      type: Object,
      required: true,
    },
  },

  emits: ['learned'],

  setup(props, { emit }) {
    const { setWordAsLearned } = useLearnedWord();

    function handleMarkAsLearned() {
      setWordAsLearned(props.definition.word);
      emit('learned');
    }

    function handleListen() {
      audio.setAudio(props.definition.phonetics[0].audio);
      audio.playAudio();
    }

    return {
      handleMarkAsLearned,
      handleListen,
    };
  },
};
</script>

<style>
.actions {
  display: flex;
  align-items: center;
}

.actions button {
  background: transparent;
  border: none;
  outline: none;
  color: var(--color);
}

.actions button svg {
  font-size: 1.25rem;
}

.phonetic {
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 1.25rem;
}
.phonetic__text {
  margin-right: 5px;
}
</style>
