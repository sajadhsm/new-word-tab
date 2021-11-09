import { ref } from 'vue';

const isModalVisible = ref(false);
const selectedShortcut = ref(null);

export default function useShortcutModal() {
  function openModal(shortcut) {
    isModalVisible.value = true;

    if (shortcut) {
      selectedShortcut.value = shortcut;
    }
  }

  function closeModal() {
    isModalVisible.value = false;

    if (selectedShortcut.value) {
      selectedShortcut.value = null;
    }
  }

  return {
    isModalVisible,
    selectedShortcut,

    openModal,
    closeModal,
  };
}
