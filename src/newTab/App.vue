<template>
  <div class="container">
    <main class="main">
      <Navbar />
      <Content />
    </main>

    <MarkedWords />
    <WordsHistory />

    <div v-if="isActive" class="sidebar">
      <SiteShortcuts />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar';
import Content from '@/components/Content';
import MarkedWords from '@/components/MarkedWords';
import WordsHistory from '@/components/WordsHistory';
import SiteShortcuts from '@/components/SiteShortcuts';

import { isActive } from '@/composables/shortcuts/useShortcuts';
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
