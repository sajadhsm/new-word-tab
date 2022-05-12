<template>
  <section class="section">
    <div class="section__bar">
      <div>
        <h2 class="section__title">{{ title }}</h2>
        <p class="section__description">{{ description }}</p>
      </div>

      <slot name="bar" />
    </div>

    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 0;
}

.section__bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.section:not(:last-of-type) {
  margin-bottom: 5px;
  border-bottom: 1px solid hsla(var(--color-raw), 0.25);
}

.section__title {
  margin: 0 0 5px;
  font-size: 1rem;
}
.section__description {
  color: hsla(var(--color-raw), 0.7);
  font-size: 0.75rem;
  margin: 0;
}
</style>
