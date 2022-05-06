<template>
  <select v-model="value" :title="title" class="select tiny-scrollbar">
    <option v-for="option of options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

interface Option {
  value: Value;
  text: string | number;
}

interface Props {
  modelValue: Value;
  title?: string;
  options?: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  options: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: Value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped>
.select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid hsla(var(--color-raw), 0.4);
  background: var(--bg-color);
  color: var(--color);
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
