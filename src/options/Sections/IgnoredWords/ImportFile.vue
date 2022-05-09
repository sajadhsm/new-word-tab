<template>
  <button class="import-btn" @click="isModalOpen = true">
    <i-ic-round-upload-file /> Import file
  </button>

  <Modal
    v-model="isModalOpen"
    title="Import file"
    subtitle="Easily expand ignored words by importing a file containing a list of words"
    @close="handleCleanUp"
  >
    <div class="description">
      <b>Constraints:</b>
      <ul>
        <li>
          Only the words that are available in our vocabulary lists will be
          matched
        </li>
        <li>
          Words can be separated using <b>space</b>, <b>tab</b>, <b>comma</b>,
          or
          <b>newline</b>
        </li>
        <li>Only words with less than <b>30</b> characters will be included</li>
        <li>All words will be auto-converted to <b>lowercase</b></li>
        <li>A <b>plain text</b> file will do the job</li>
      </ul>
    </div>

    <FileSelector accept="text/plain" @file="handleFile" />

    <div v-if="isFileSelected" class="footer">
      <template v-if="importedWords.length">
        <p class="footer-msg">
          <i-ic-round-check-circle />
          Found <b>{{ importedWords.length }}</b> word{{
            importedWords.length > 1 ? 's' : ''
          }}
        </p>

        <div class="actions">
          <button class="btn" @click="handleClose">Cancel</button>
          <button class="btn btn--primary" @click="handleImport">Import</button>
        </div>
      </template>
      <template v-else>
        <p class="footer-msg">
          <i-ic-round-error /> No word found! Select another file.
        </p>
      </template>
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
const isFileSelected = ref(false);
const importedWords = ref<string[]>([]);

async function handleFile(file: File) {
  const content = (await readFile(file)) as string;
  const words = getWordsOfText(content, 30).map((w) => w.toLowerCase());
  const intersect = getIntersection(words);

  importedWords.value = intersect;
  isFileSelected.value = true;
}

function handleImport() {
  emit('import', importedWords.value);
  handleClose();
}

function handleClose() {
  isModalOpen.value = false;
}

function handleCleanUp() {
  importedWords.value = [];
  isFileSelected.value = false;
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
  margin-bottom: 20px;
}

ul {
  padding-left: 25px;
}
ul li {
  margin: 0 0 5px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid hsla(var(--color-raw), 0.2);
  padding-top: 15px;
  margin-top: 15px;
  font-size: 1rem;
}

.footer p {
  margin: 0;
}

.actions {
  display: flex;
  gap: 4px;
}

.btn {
  padding: 6px 15px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.75rem;
  border: 1px solid hsla(var(--color-raw), 0.3);
  background-color: transparent;
  color: var(--color);
}
.btn:hover {
  background-color: hsla(var(--color-raw), 0.05);
}

.btn--primary {
  margin-left: 10px;
  border: 1px solid var(--color);
  background-color: var(--color);
  color: var(--bg-color);
}
.btn--primary:hover {
  background-color: hsla(var(--color-raw), 0.9);
}

.footer-msg {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
