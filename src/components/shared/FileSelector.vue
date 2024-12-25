<script lang="ts" setup>
import { ref } from 'vue'
import { formatBytes } from '@/utils/number'

interface Props {
  id: string
  accept: string
  label?: string
  maxSize?: number
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Select a file',
  maxWidth: undefined,
  maxSize: Infinity,
})

const emit = defineEmits<{
  (e: 'file', file: File): void
}>()

const input = ref<HTMLInputElement | null>(null)
const fileName = ref('')

async function handleFile() {
  if (input.value?.files?.length) {
    const file = input.value.files[0]

    if (file.size > props.maxSize) {
      // eslint-disable-next-line no-alert
      alert(
        `File size (${formatBytes(
          file.size,
        )}) should not be greater than ${formatBytes(props.maxSize)}!`,
      )
      return
    }

    fileName.value = file.name
    emit('file', file)
  }
}
</script>

<template>
  <div class="file-input">
    <input
      :id="id"
      ref="input"
      class="input"
      type="file"
      :accept="accept"
      @change="handleFile"
    >

    <label :for="id" :style="{ maxWidth }">
      {{ fileName ? fileName : label }}
    </label>
  </div>
</template>

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
  display: block;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color);
  background: hsla(var(--color-raw), 0.15);
  cursor: pointer;
  transition: background-color ease-in-out 0.13s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.input:hover + label,
.input:focus + label {
  background: hsla(var(--color-raw), 0.25);
}
</style>
