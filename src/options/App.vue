<template>
  <div class="options">
    <Header />
    <GoogleTranslate />
    <SiteShortcuts />
    <Background />
    <Theme />
    <VocabularyLists />
    <IgnoredWords />
  </div>
</template>

<script setup lang="ts">
import GoogleTranslate from './Sections/GoogleTranslate.vue';
import VocabularyLists from './Sections/VocabularyLists.vue';
import SiteShortcuts from './Sections/SiteShortcuts.vue';
import Background from './Sections/Background.vue';
import IgnoredWords from './Sections/IgnoredWords';
import Header from './Sections/Header.vue';
import Theme from './Sections/Theme.vue';
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.options {
  max-width: 725px;
  margin: 0 auto;
  padding: 0 25px;

  background-color: hsla(var(--bg-color-raw), 0.9);
  backdrop-filter: blur(5px);
  min-height: 100vh;
}
</style>
