<template>
  <section :class="['section', { 'section--column': column }]">
    <div>
      <h2 class="section__title">{{ title }}</h2>
      <p class="section__description">{{ description }}</p>
    </div>

    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  column?: boolean;
}

withDefaults(defineProps<Props>(), {
  column: false,
});
</script>

<style scoped>
.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  padding: 10px 0;
  margin-bottom: 5px;
}

.section--column {
  flex-direction: column;
  justify-content: initial;
  align-items: initial;
}

.section:not(:last-of-type) {
  border-bottom: 1px solid hsla(var(--color-raw), 0.25);
}

.section__title {
  margin: 0 0 5px;
  font-size: 1rem;
}
.section__description {
  color: hsla(var(--color-raw), 0.7);
  font-size: 0.75rem;
  margin-top: 0;
}
</style>
