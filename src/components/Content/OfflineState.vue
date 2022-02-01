<template>
  <div class="offline">
    <span class="icon">
      <i-ic-round-wifi-off />
    </span>

    <h3 class="title">You are offline</h3>

    <p class="description">
      You need to connect to the internet to see word definitions.
    </p>
  </div>
</template>

<style scoped>
.offline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
}

.icon {
  font-size: 3rem;
}

.title {
  margin: 0;
  font-size: 2rem;
}
.description {
  font-size: 1rem;
  color: hsla(var(--color-raw), 0.75);
}
</style>
