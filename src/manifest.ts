import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import { isDev, port, r } from '../scripts/utils'

import type PkgType from '../package.json'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    description: pkg.description,
    version: pkg.version,

    chrome_url_overrides: {
      newtab: './dist/newTab/index.html',
    },

    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },

    icons: {
      16: './assets/16.png',
      32: './assets/32.png',
      48: './assets/48.png',
      128: './assets/128.png',
    },

    content_security_policy: {
      extension_pages: [
        'img-src * data:',
        'object-src \'self\'',
        `script-src 'self' ${isDev ? `http://localhost:${port}` : ''}`.trim(),
      ].join(';'),
    },
  }

  return manifest
}
