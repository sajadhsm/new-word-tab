import { resolve } from 'path';
import pc from 'picocolors';

export const port = parseInt(process.env.PORT || '') || 3030;

export const r = (...args: string[]) => resolve(__dirname, '..', ...args);

export const isDev = process.env.NODE_ENV !== 'production';

export function log(name: string, message: string) {
  console.log(pc.cyan(`[${name}]`), message);
}
