<template>
  <div class="no-word-list">
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
import { openOptionsPage } from '@/utils/browser';
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

.no-word-list__emoji {
  font-size: 5rem;
}

.no-word-list__title {
  margin: 10px 0;
  font-size: 2rem;
}

.no-word-list__subtitle {
  margin: 0;
  font-size: 1.25rem;
}

.options-page-link {
  cursor: pointer;
  font-weight: bold;
}
.options-page-link:hover {
  opacity: 0.75;
}
</style>
