import { ref } from 'vue'

type Theme = 'dark' | 'light'

declare global {
  interface Window {
    __theme: any
    __setPreferredTheme: (theme: Theme) => void
    __onThemeChange: (theme: Theme) => void
  }
}

// Theme logic is implemented inline in newTab/index.html
export default function useTheme() {
  const theme = ref(window.__theme || 'light')

  function toggleTheme() {
    window.__setPreferredTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  window.__onThemeChange = (newTheme) => {
    theme.value = newTheme
  }

  return {
    theme,
    toggleTheme,
  }
}
