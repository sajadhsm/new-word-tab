<template>
  <div class="error">
    <span class="icon">{{ emoji }}</span>

    <h2 class="error__title">
      Ops! Couldn't find any definitions for <i class="word">"{{ word }}"</i>
    </h2>

    <p class="error__subtitle">Well, what now? Use the actions below...!</p>

    <div class="actions">
      <div class="actions__secondary">
        <button class="action secondary-action" @click="handleIgnoreWord">
          <i-ic-round-visibility-off /> Ignore word
        </button>
        <a
          :href="`https://translate.google.com/?sl=en&tl=${targetLanguage.code}&text=${word}&op=translate`"
          target="_blank"
          class="action secondary-action"
        >
          <i-ic-round-g-translate /> Google Translate
        </a>
      </div>

      <button class="action main-action" @click="$emit('retry')">
        <i-ic-round-autorenew /> Get new word
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGoogleTranslate from '@/composables/useGoogleTranslate';
import useIgnoredWords from '@/composables/words/useIgnoredWords';

import { randomNumberBetween } from '@/utils/number';

const EMOJIS = ['🥺', '😔', '☹️'];

const props = defineProps<{
  word: string;
}>();

const emit = defineEmits(['retry']);

const { setAsIgnored } = useIgnoredWords();
const { targetLanguage } = useGoogleTranslate();

const handleIgnoreWord = () => {
  setAsIgnored(props.word);
  emit('retry');
};

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
  color: hsla(var(--color-raw), 0.8);
  margin-bottom: 20px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.actions__secondary {
  display: flex;
  align-items: center;
  gap: 15px;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.main-action {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: var(--color);
  color: var(--bg-color);
  font-size: 1rem;
  font-weight: bold;
}
.main-action:hover {
  transition: background-color 0.13s ease-in-out;
  background-color: hsla(var(--color-raw), 0.85);
}

.secondary-action {
  background: hsla(var(--color-raw), 0.1);
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  color: var(--color);
  font-size: 0.8rem;
  text-decoration: none;
}
.secondary-action:hover {
  transition: background-color 0.13s ease-in-out;
  background: hsla(var(--color-raw), 0.2);
}
</style>
