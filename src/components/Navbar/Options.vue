<template>
  <NavButton title="Options" @click="openOptionsPage">
    <i-ic-round-settings />
  </NavButton>
</template>

<script>
import NavButton from './NavButton.vue';

export default {
  name: 'Options',

  components: {
    NavButton,
  },

  setup() {
    function openOptionsPage() {
      const browser = chrome || browser;
      browser.runtime.openOptionsPage();
    }

    return {
      openOptionsPage,
    };
  },
};
</script>
