<template>
  <div class="file-input">
    <input
      id="file"
      ref="input"
      class="input"
      type="file"
      :accept="accept"
      @change="handleFile"
    />

    <label for="file">
      {{ fileName ? fileName : label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  accept: string;
  label?: string;
}

withDefaults(defineProps<Props>(), { label: 'Select a file' });

const emit = defineEmits<{
  (e: 'file', file: File): void;
}>();

const input = ref<HTMLInputElement | null>(null);
const fileName = ref('');

const handleFile = async () => {
  if (input.value?.files?.length) {
    const file = input.value.files[0];
    fileName.value = file.name;
    emit('file', file);
  }
};
</script>

<style scoped>
.file-input {
  position: relative;
}

.input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

label {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color);
  background: hsla(var(--color-raw), 0.15);
  cursor: pointer;
  transition: background-color ease-in-out 0.13s;
}

.input:hover + label,
.input:focus + label {
  background: hsla(var(--color-raw), 0.25);
}
</style>
