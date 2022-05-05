<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: hsla(var(--color-raw), 0.25);
  background-color: transparent;
  transition: color ease-in-out 0.1s;
}

button:hover {
  color: var(--color);
}
</style>
