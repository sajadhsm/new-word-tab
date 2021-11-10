<template>
  <NavButton title="Options" @click="openOptionsPage">
    <i-ic-round-settings />
  </NavButton>
</template>

<script>
import { openOptionsPage } from '@/utils/browser';

import NavButton from './NavButton.vue';

export default {
  name: 'Options',

  components: {
    NavButton,
  },

  setup() {
    return { openOptionsPage };
  },
};
</script>
