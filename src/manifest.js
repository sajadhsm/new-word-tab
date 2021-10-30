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

    options_page: './dist/options/index.html',

    icons: {
      16: './assets/16.png',
      32: './assets/32.png',
      48: './assets/48.png',
      128: './assets/128.png',
    },
  };

  if (isDev) {
    // This is required on dev for Vite script to load
    manifest.content_security_policy = `script-src 'self' http://localhost:${port}; object-src 'self'`;
  }

  return manifest;
}
