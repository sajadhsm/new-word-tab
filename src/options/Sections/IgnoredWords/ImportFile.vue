<template>
  <button class="import-btn" @click="isModalOpen = true">
    <i-ic-round-upload-file /> Import
  </button>

  <Modal v-model="isModalOpen" title="Import words from file">
    <div class="description">
      <p>
        You can import a custom list of files to be added to the ignored words
        list.
      </p>
      <b>Constraints:</b>
      <ul>
        <li>
          Only the words that are available in NWT inventory will be included
        </li>
        <li>
          Words can be separated using <i>space</i>, <i>tab</i>, <i>comma</i> or
          <i>new line</i>
        </li>
        <li>Words longer than <b>30</b> characters won't include</li>
        <li>Words will be auto imported as lowercase</li>
        <li>Only <code>.txt</code> file format is allowed</li>
      </ul>
    </div>

    <FileSelector accept="text/plain" @file="handleFile" />

    <div v-if="importedWords.length">
      <p>Found {{ importedWords.length }} word(s)</p>

      <button @click="handleCancel">Cancel</button>
      <button @click="handleImport">Import</button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import FileSelector from '@/components/shared/FileSelector.vue';
import Modal from '@/components/shared/Modal.vue';
import useWordLists from '@/composables/words/useWordLists';

import { getWordsOfText } from '@/utils/string';
import { readFile } from '@/utils/file';

const emit = defineEmits<{
  (e: 'import', words: string[]): void;
}>();

const { getIntersection } = useWordLists();

const isModalOpen = ref(false);
const importedWords = ref<string[]>([]);

async function handleFile(file: File) {
  const content = (await readFile(file)) as string;
  const words = getWordsOfText(content, 30).map((w) => w.toLowerCase());
  const intersect = getIntersection(words);

  importedWords.value = intersect;
}

function handleImport() {
  emit('import', importedWords.value);
  handleCancel();
}

function handleCancel() {
  importedWords.value = [];
  isModalOpen.value = false;
}
</script>

<style scoped>
.import-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: none;
  color: var(--color);
  background-color: hsla(var(--color-raw), 0.1);
  transition: background-color ease-in-out 0.13s;
}
.import-btn:hover {
  background-color: hsla(var(--color-raw), 0.2);
}

.description {
  font-size: 0.85rem;
  margin-bottom: 30px;
}
</style>
