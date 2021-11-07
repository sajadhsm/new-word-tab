<template>
  <div class="container">
    <main class="main">
      <Navbar />
      <Content />
    </main>

    <SiteShortcuts />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Content from '@/components/Content';
import SiteShortcuts from '@/components/SiteShortcuts';

export default {
  components: {
    Navbar,
    Content,
    SiteShortcuts,
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
</style>
