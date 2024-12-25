<script setup lang="ts">
import Content from '@/components/Content'
import Navbar from '@/components/Navbar'
import NavbarBottom from '@/components/NavbarBottom'
import SiteShortcuts from '@/components/SiteShortcuts'

import { isActive } from '@/composables/shortcuts/useShortcuts'
import useBackground from '@/composables/useBackground'

useBackground({ initialize: true })
</script>

<template>
  <div class="container">
    <main class="main">
      <Navbar />
      <Content />
    </main>

    <NavbarBottom />

    <div v-if="isActive" class="sidebar">
      <SiteShortcuts />
    </div>
  </div>
</template>

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
