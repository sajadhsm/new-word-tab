import fs from 'fs-extra';
import chokidar from 'chokidar';
import { writeManifest } from './manifest';
import { r, port, isDev, log } from './utils';

async function stubIndexHtml() {
  const views = ['newTab'];

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));

    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8');
    data = data
      .replace('"./main.js"', `"http://localhost:${port}/${view}/main.js"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>'
      );
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8');

    log('PRE', `stub ${view}`);
  }
}

writeManifest();

if (isDev) {
  stubIndexHtml();

  chokidar.watch(r('src/**/*.html')).on('change', () => {
    stubIndexHtml();
  });

  chokidar.watch([r('src/manifest.js'), r('package.json')]).on('change', () => {
    writeManifest();
  });
}
