<template>
  <header class="header">
    <h1 class="title">Options</h1>

    <a class="version" href="https://github.com/sajadhsm/new-word-tab/releases">
      v{{ version }}
    </a>
  </header>
</template>

<script setup lang="ts">
import { version } from '@/../package.json';
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
}

.title {
  font-size: 2rem;
  margin: 0;
}

.version {
  font-size: 0.8rem;
  text-decoration: none;
  color: #666;
}
.version:hover {
  color: #aaa;
}
</style>
