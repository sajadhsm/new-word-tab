<template>
  <div class="error">
    <span class="icon">{{ emoji }}</span>

    <h2 class="error__title">
      Ops! Couldn't find any definitions for <i class="word">"{{ word }}"</i>
    </h2>

    <p class="error__subtitle">
      You may check Google Translate or try another word.
    </p>

    <div class="actions">
      <button class="retry-btn" @click="$emit('retry')">Get new word</button>
      <a
        :href="`https://translate.google.com/?sl=en&tl=${targetLanguage.code}&text=${word}&op=translate`"
        target="_blank"
        class="gt-link"
      >
        Google Translate
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGoogleTranslate from '@/composables/useGoogleTranslate';

import { randomNumberBetween } from '@/utils/number';

const EMOJIS = ['🥺', '😔', '☹️'];

defineProps({
  word: {
    type: String,
    required: true,
  },
});

defineEmits(['retry']);

const { targetLanguage } = useGoogleTranslate();

const randomEmojiIndex = randomNumberBetween(0, EMOJIS.length - 1);
const emoji = EMOJIS[randomEmojiIndex];
</script>

<style scoped>
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

.icon {
  font-size: 3rem;
}

.word {
  text-transform: capitalize;
}

.error__title {
  font-size: 1.25rem;
  margin: 20px 0 10px;
}

.error__subtitle {
  margin-bottom: 30px;
  color: hsla(var(--color-raw), 0.75);
}

.actions {
  display: flex;
  flex-direction: column;
}

.retry-btn {
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: var(--color);
  color: var(--bg-color);
  font-size: 1rem;
  font-weight: bold;
}
.retry-btn:hover {
  transition: background-color 0.13s ease-in-out;
  background-color: hsla(var(--color-raw), 0.85);
}

.gt-link {
  color: var(--color);
  font-size: 0.8rem;
  text-decoration: none;
}
.gt-link:hover {
  transition: background-color 0.13s ease-in-out;
  color: hsla(var(--color-raw), 0.85);
}
</style>
