<template>
  <input ref="input" :accept="accept" type="file" @change="handleFile" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
  accept: string;
}>();

const emit = defineEmits<{
  (e: 'file', file: File): void;
}>();

const input = ref<HTMLInputElement | null>(null);

const handleFile = async () => {
  if (input.value?.files?.length) {
    const file = input.value.files[0];
    emit('file', file);
  }
};
</script>
