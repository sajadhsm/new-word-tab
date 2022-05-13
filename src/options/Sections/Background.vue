<template>
  <Section title="Background" description="Customize page background.">
    <template #bar>
      <Select v-model="mode" :options="options" />
    </template>

    <div v-if="mode === BackgroundMode.IMAGE" class="actions">
      <input
        v-model="url"
        class="url"
        type="url"
        placeholder="Enter an image URL"
        @change="handleURLChange"
      />

      <span>or</span>

      <FileSelector
        id="bg-file"
        label="Select a local file"
        max-width="150px"
        accept="image/*"
        @file="handleFileSelect"
      />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { readFile } from '@/utils/file';

import Section from '@/options/components/Section.vue';
import Select from '@/options/components/Select.vue';

import FileSelector from '@/components/shared/FileSelector.vue';
import useBackground, { BackgroundMode } from '@/composables/useBackground';

const { url, mode, saveImageDataURL } = useBackground({ initialize: true });

const options = [
  {
    text: 'No Background',
    value: BackgroundMode.NO_BG,
  },
  {
    text: 'Custom Image',
    value: BackgroundMode.IMAGE,
  },
];

const handleFileSelect = async (file: File) => {
  const base64 = (await readFile(file, 'dataURL')) as string;
  saveImageDataURL(base64);
};

const handleURLChange = () => saveImageDataURL(url.value);
</script>

<style scoped>
.actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.url {
  flex-grow: 1;
  background-color: hsla(var(--color-raw), 0.15);
  color: var(--color);
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  outline: none;
  transition: background-color ease-in-out 0.13s;
}
.url:hover,
.url:focus {
  background-color: hsla(var(--color-raw), 0.25);
}
.url::placeholder {
  color: hsla(var(--color-raw), 0.6);
}
</style>
