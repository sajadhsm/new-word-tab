<template>
  <button class="theme-btn" title="Switch theme" @click="toggleTheme">
    <i-ic-round-dark-mode v-if="theme === 'dark'" />
    <i-ic-round-light-mode v-else />
  </button>
</template>

<script>
import useTheme from '@/composables/useTheme';

export default {
  name: 'ThemeSwitch',

  setup() {
    const { theme, toggleTheme } = useTheme();

    return { theme, toggleTheme };
  },
};
</script>
