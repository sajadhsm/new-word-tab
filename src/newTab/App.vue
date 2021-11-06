<template>
  <Navbar />
  <Content />
  <SiteShortcuts />
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
