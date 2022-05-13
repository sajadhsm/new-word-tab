<template>
  <div class="no-word-list" :class="backgroundClass">
    <span class="no-word-list__emoji">😐</span>
    <h1 class="no-word-list__title">There's nothing to show!</h1>
    <p class="no-word-list__subtitle">
      Please head to
      <a class="options-page-link" @click="openOptionsPage">options page</a> and
      select at least one vocabulary list.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { openOptionsPage } from '@/utils/browser';

import useBackground from '@/composables/useBackground';

const { shouldModifyUI } = useBackground();

const backgroundClass = computed(() => ({
  'no-word-list--boxed': shouldModifyUI.value,
}));
</script>

<style scoped>
.no-word-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 15px;
  text-align: center;
  font-size: 1rem;
}

.no-word-list--boxed {
  background-color: hsla(var(--bg-color-raw), 0.9);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 40px 5px;
  max-width: 650px;
}

.no-word-list__emoji {
  font-size: 3rem;
}

.no-word-list__title {
  margin: 20px 0 10px;
  font-size: 1.25rem;
}

.no-word-list__subtitle {
  margin: 0;
  font-size: 1rem;
}

.options-page-link {
  cursor: pointer;
  font-weight: bold;
}
.options-page-link:hover {
  opacity: 0.75;
}
</style>
