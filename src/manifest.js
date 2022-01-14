import fs from 'fs-extra';
import { r, isDev, port } from '../scripts/utils';

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json'));

  const manifest = {
    manifest_version: 2,
    name: pkg.displayName || pkg.name,
    description: pkg.description,
    version: pkg.version,

    chrome_url_overrides: {
      newtab: './dist/newTab/index.html',
    },

    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
      chrome_style: false,
      browser_style: false,
    },

    icons: {
      16: './assets/16.png',
      32: './assets/32.png',
      48: './assets/48.png',
      128: './assets/128.png',
    },
  };

  const FART_FIX_INLINE_SCRIPT_HASH =
    'sha256-yipOR2BJj3VZDIBaEdL8ttsQlrfwgdNUpoQlgXuqzj0=';

  manifest.content_security_policy = `object-src 'self'; script-src 'self' '${FART_FIX_INLINE_SCRIPT_HASH}'`;

  if (isDev) {
    // This is required on dev for Vite script to load
    manifest.content_security_policy += ` http://localhost:${port}`;
  }

  return manifest;
}
