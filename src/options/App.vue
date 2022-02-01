<template>
  <div class="options">
    <h1>Options</h1>
    <hr />

    <GoogleTranslate />
    <SiteShortcuts />
    <VocabularyLists />
    <LearnedWords />
  </div>
</template>

<script setup lang="ts">
import GoogleTranslate from './Sections/GoogleTranslate.vue';
import VocabularyLists from './Sections/VocabularyLists.vue';
import SiteShortcuts from './Sections/SiteShortcuts.vue';
import LearnedWords from './Sections/LearnedWords.vue';
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

.op-section {
  padding: 10px 0;
  margin-bottom: 5px;
}
.op-section:not(:last-of-type) {
  border-bottom: 1px solid #eee;
}

.op-section__title {
  margin: 0 0 5px;
  font-size: 1rem;
}
.op-section__subtitle {
  color: #666;
  font-size: 0.75rem;
  margin-top: 0;
}
</style>
