<script setup lang="ts">
import type { IWordDefinition } from '@/composables/words/useWordDefinitions'

import IconButton from '@/components/shared/IconButton.vue'

import audio from '@/modules/audio'
import { computed } from 'vue'

const props = defineProps<{
  definition: IWordDefinition
}>()

const phonetic = computed(() => {
  const { phonetics } = props.definition

  return (
    phonetics.find(p => p.audio && p.text)
    || phonetics.find(p => p.audio)
    || phonetics.find(p => p.text)
  )
})

function handleListen() {
  if (phonetic.value?.audio) {
    audio.setAudio(phonetic.value.audio)
    audio.playAudio()
  }
}
</script>

<template>
  <div v-if="phonetic" class="phonetic">
    <small v-if="phonetic.text">
      {{ phonetic.text }}
    </small>
    <IconButton v-if="phonetic.audio" title="Listen" @click="handleListen">
      <i-ic-round-volume-up />
    </IconButton>
  </div>
</template>

<style scoped>
.phonetic {
  display: flex;
  gap: 6px;
  font-size: 1.25rem;
  padding: 0 4px;
  margin-top: 5px;
}
</style>
