<template>
  <div class="navbar">
    <Search />
    <ThemeSwitch class="btn-gap" />
    <Options class="btn-gap" />
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue';
import Options from './Options.vue';
import Search from './Search.vue';
</script>

<style scoped>
.navbar {
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
}

.btn-gap {
  margin-left: 0.5rem;
}
</style>
