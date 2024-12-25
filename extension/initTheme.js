(function () {
  window.__onThemeChange = function () {}

  let preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  }
  catch {}

  function setTheme(newTheme) {
    window.__theme = newTheme
    preferredTheme = newTheme
    document.body.className = newTheme
    window.__onThemeChange(newTheme)
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    }
    catch {}
  }

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addEventListener('change', (event) => {
    window.__setPreferredTheme(event.matches ? 'dark' : 'light')
  })

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
})()
