<template>
  <IconButton title="Switch theme" @click="toggleTheme">
    <i-ic-round-dark-mode v-if="theme === 'dark'" />
    <i-ic-round-light-mode v-else />
  </IconButton>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue';

import useTheme from '@/composables/useTheme';

export default {
  name: 'ThemeSwitch',

  components: {
    IconButton,
  },

  setup() {
    const { theme, toggleTheme } = useTheme();

    return { theme, toggleTheme };
  },
};
</script>
