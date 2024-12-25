import { resolve } from 'path';
import process from 'node:process'
import { bgCyan, black } from 'kolorist'

export const port = Number(process.env.PORT || '') || 3030;

export const r = (...args: string[]) => resolve(__dirname, '..', ...args);

export const isDev = process.env.NODE_ENV !== 'production';

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
