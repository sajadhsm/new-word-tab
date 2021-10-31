<template>
  <button class="nav-btn" :title="title">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'NavButton',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.nav-btn {
  display: inline-flex;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  color: var(--color);
  font-size: 1.5rem;
}
</style>
