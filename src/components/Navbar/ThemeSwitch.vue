<template>
  <NavButton title="Switch theme" @click="toggleTheme">
    <i-ic-round-dark-mode v-if="theme === 'dark'" />
    <i-ic-round-light-mode v-else />
  </NavButton>
</template>

<script>
import NavButton from './NavButton.vue';

import useTheme from '@/composables/useTheme';

export default {
  name: 'ThemeSwitch',

  components: {
    NavButton,
  },

  setup() {
    const { theme, toggleTheme } = useTheme();

    return { theme, toggleTheme };
  },
};
</script>
