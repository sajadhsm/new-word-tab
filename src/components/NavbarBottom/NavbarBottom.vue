<script lang="ts" setup>
import { computed } from 'vue'

import MarkedWords from './MarkedWords'
import WordsHistory from './WordsHistory'

import useBackground from '@/composables/useBackground'

const { shouldModifyUI } = useBackground()

const backgroundClass = computed(() => ({
  'navbar--boxed': shouldModifyUI.value,
}))
</script>

<template>
  <nav class="navbar" :class="backgroundClass">
    <WordsHistory />
    <MarkedWords />
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.navbar--boxed {
  background-color: hsla(var(--bg-color-raw), 0.9);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  padding: 12px 8px;
}
</style>
