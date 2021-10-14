<template>
  <div class="error">
    <h2 class="error__title">Ops! Looks like something went wrong. :(</h2>

    <p class="error__subtitle">
      Please check your connection & try getting a new word.
    </p>

    <button class="error__retry-btn" @click="$emit('retry')">Try again</button>
  </div>
</template>

<script>
export default {
  name: 'Error',

  emits: ['retry'],
};
</script>

<style>
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 15px;
  text-align: center;
  font-size: 1rem;
}

.error__title {
  margin: 0 0 10px;
}

.error__subtitle {
  margin-bottom: 30px;
}

.error__retry-btn {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: var(--color);
  color: var(--bg-color);
  font-size: 1rem;
}
</style>
