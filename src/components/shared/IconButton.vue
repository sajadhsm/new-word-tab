<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href" class="icon-btn">
    <slot />
  </component>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--color);
  font-size: 1.25rem;
}
.icon-btn:hover {
  transition: color ease-in-out 0.1s;
  color: hsla(var(--color-raw), 0.75);
}
</style>
