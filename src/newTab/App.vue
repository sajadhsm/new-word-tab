<template>
  <div class="container">
    <main class="main">
      <Navbar />
      <Content />
    </main>

    <div v-if="isActive" class="sidebar">
      <SiteShortcuts />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Content from '@/components/Content';
import SiteShortcuts from '@/components/SiteShortcuts';

import { isActive } from '@/composables/useShortcuts';

export default {
  components: {
    Navbar,
    Content,
    SiteShortcuts,
  },

  setup() {
    return { isActive };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row-reverse;
  min-height: 100vh;
}

.main {
  position: relative;
  flex: 1;
}

.sidebar {
  width: 55px;
}
</style>
