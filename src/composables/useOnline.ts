import { ref } from 'vue'

export default function useOnline() {
  const isOnline = ref(navigator.onLine)

  window.addEventListener('offline', () => {
    isOnline.value = false
  })

  window.addEventListener('online', () => {
    isOnline.value = true
  })

  return { isOnline }
}
