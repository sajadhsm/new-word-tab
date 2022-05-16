(function () {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.__onThemeChange = function () {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.body.className = newTheme;
    window.__onThemeChange(newTheme);
  }

  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
    // eslint-disable-next-line no-empty
  } catch (e) {}

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addEventListener('change', function (event) {
    window.__setPreferredTheme(event.matches ? 'dark' : 'light');
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();
