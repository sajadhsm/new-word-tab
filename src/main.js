import displayWordDefinitions from './modules/render.js';
import { initTheme } from './modules/theme.js';
import getNewWord from './modules/word.js';

async function main() {
  initTheme();

  const wordDefinitions = await getNewWord();
  displayWordDefinitions(wordDefinitions);
}

main();
