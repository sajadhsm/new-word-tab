<script setup lang="ts">
import { computed } from 'vue'

import ThemeSwitch from './ThemeSwitch.vue'
import Options from './Options.vue'
import Search from './Search.vue'
import useBackground from '@/composables/useBackground'

const { shouldModifyUI } = useBackground()

const backgroundClass = computed(() => ({
  'navbar--boxed': shouldModifyUI.value,
}))
</script>

<template>
  <div class="navbar" :class="backgroundClass">
    <Search />
    <ThemeSwitch class="btn-gap" />
    <Options class="btn-gap" />
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  right: 1rem;
  top: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
}

.navbar--boxed {
  background-color: hsla(var(--bg-color-raw), 0.9);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  padding: 5px 10px;
}

.btn-gap {
  margin-left: 0.5rem;
}
</style>
