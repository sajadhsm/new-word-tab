import { ref } from 'vue'

const isModalVisible = ref(false)

export default function useShortcutModal() {
  function openModal() {
    isModalVisible.value = true
  }

  function closeModal() {
    isModalVisible.value = false
  }

  return {
    isModalVisible,
    closeModal,
    openModal,
  }
}
