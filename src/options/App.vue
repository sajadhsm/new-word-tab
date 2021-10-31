<template>
  <div class="options">
    <h1>Options</h1>
    <hr />

    <GoogleTranslate />
    <LearnedWords />
  </div>
</template>

<script>
import GoogleTranslate from './Sections/GoogleTranslate.vue';
import LearnedWords from './Sections/LearnedWords.vue';

export default {
  name: 'Options',

  components: { GoogleTranslate, LearnedWords },
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

.op-section__title {
  margin-bottom: 5px;
}
.op-section__subtitle {
  margin-top: 0;
}
</style>
