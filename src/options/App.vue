<template>
  <div class="options">
    <h1>Options</h1>
    <hr />

    <GoogleTranslate />
    <SiteShortcuts />
    <LearnedWords />
  </div>
</template>

<script>
import GoogleTranslate from './Sections/GoogleTranslate.vue';
import SiteShortcuts from './Sections/SiteShortcuts.vue';
import LearnedWords from './Sections/LearnedWords.vue';

export default {
  name: 'Options',

  components: {
    GoogleTranslate,
    SiteShortcuts,
    LearnedWords,
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
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
