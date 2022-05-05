<template>
  <div class="options">
    <Header />
    <GoogleTranslate />
    <SiteShortcuts />
    <VocabularyLists />
    <IgnoredWords />
  </div>
</template>

<script setup lang="ts">
import GoogleTranslate from './Sections/GoogleTranslate.vue';
import VocabularyLists from './Sections/VocabularyLists.vue';
import SiteShortcuts from './Sections/SiteShortcuts.vue';
import IgnoredWords from './Sections/IgnoredWords.vue';
import Header from './Sections/Header.vue';
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
  max-width: 700px;
  margin: 0 auto;
  padding: 0 10px;
}
</style>
