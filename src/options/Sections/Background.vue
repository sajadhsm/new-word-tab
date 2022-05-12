<template>
  <Section title="Background" description="Customize page background">
    <div>
      <Select v-model="mode" :options="options" />

      <FileSelector
        v-if="mode === 'file'"
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
import useBackground from '@/composables/useBackground';

const { mode, saveImageBase64 } = useBackground({ initialize: true });

const options = [
  {
    text: 'Theme Color',
    value: 'theme',
  },
  {
    text: 'Custom Image',
    value: 'file',
  },
];

const handleFileSelect = async (f: File) => {
  const base64 = (await readFile(f, 'dataURL')) as string;
  saveImageBase64(base64);
};
</script>
