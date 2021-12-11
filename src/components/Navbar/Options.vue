<template>
  <IconButton title="Options" @click="openOptionsPage">
    <i-ic-round-settings />
  </IconButton>
</template>

<script>
import { openOptionsPage } from '@/utils/browser';

import IconButton from '@/components/shared/IconButton.vue';

export default {
  name: 'Options',

  components: {
    IconButton,
  },

  setup() {
    return { openOptionsPage };
  },
};
</script>
