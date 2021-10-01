import displayWordDefinitions from './modules/render.js';
import getNewWord from './modules/word.js';

async function main() {
  const wordDefinitions = await getNewWord();
  displayWordDefinitions(wordDefinitions);
}

main();
