import fs from 'fs-extra';
import { r, log } from './utils';
import { getManifest } from '../src/manifest';

export async function writeManifest() {
  await fs.writeJSON(r('extension/manifest.json'), await getManifest(), {
    spaces: 2,
  });
  log('PRE', 'write manifest.json');
}
