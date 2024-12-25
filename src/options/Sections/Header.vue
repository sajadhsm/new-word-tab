<script setup lang="ts">
import { version } from '@/../package.json'
</script>

<template>
  <header class="header">
    <h1 class="title">
      Options
    </h1>

    <div class="info">
      <a
        class="version"
        href="https://github.com/sajadhsm/new-word-tab/releases"
      >
        NWT v{{ version }}
      </a>
      <small class="copyright">
        MIT Licensed • Copyright © 2021-PRESENT Sajad Hashemian
      </small>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid hsla(var(--color-raw), 0.5);
}

.title {
  font-size: 2rem;
  margin: 0;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.version {
  font-size: 0.8rem;
  text-decoration: none;
  color: hsla(var(--color-raw), 0.7);
}
.version:hover {
  color: hsla(var(--color-raw), 0.5);
}

.copyright {
  color: hsla(var(--color-raw), 0.5);
  font-size: 0.6rem;
}

@media screen and (max-width: 450px) {
  .header {
    flex-direction: column;
  }

  .info {
    align-items: center;
    text-align: center;
  }
}
</style>
