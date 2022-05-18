<template>
  <Section title="Theme" description="Change theme color scheme.">
    <template #bar>
      <button title="Switch theme" class="toggle-btn" @click="toggleTheme">
        <template v-if="theme === 'dark'">
          <i-ic-round-dark-mode />
          Dark
        </template>
        <template v-else>
          <i-ic-round-light-mode />
          Light
        </template>
      </button>
    </template>
  </Section>
</template>

<script setup lang="ts">
import Section from '../components/Section.vue';

import useTheme from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.toggle-btn {
  display: inline-flex;
  justify-items: center;
  gap: 5px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color);
  background: hsla(var(--color-raw), 0.15);
  transition: background-color ease-in-out 0.13s;
}
.toggle-btn:hover {
  background: hsla(var(--color-raw), 0.25);
}
</style>
