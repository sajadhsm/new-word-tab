import fs from 'fs-extra';
import { r, isDev, port } from '../scripts/utils';

import type PkgType from '../package.json';
import type { Manifest } from 'webextension-polyfill';

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  const manifest: Manifest.WebExtensionManifest = {
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

    content_security_policy: "object-src 'self'; script-src 'self'",
  };

  if (isDev) {
    // This is required on dev for Vite script to load
    manifest.content_security_policy += ` http://localhost:${port}`;
  }

  return manifest;
}
