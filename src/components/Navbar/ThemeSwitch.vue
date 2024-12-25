<script setup lang="ts">
import IconButton from '@/components/shared/IconButton.vue'
import useTheme from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <IconButton title="Switch theme" @click="toggleTheme">
    <i-ic-round-dark-mode v-if="theme === 'dark'" />
    <i-ic-round-light-mode v-else />
  </IconButton>
</template>
