import { WORD_ELEMENT, PHONETIC_ELEMENT, MEANINGS_ELEMENT, PHONETIC_LISTEN_BUTTON } from './elements.js';
import { createElement } from './utils.js';
import audio from './audio.js';

export default function displayWordDefinitions(wordDefinitions) {
  const { word, meanings, phonetic, phonetics } = wordDefinitions[0];

  renderWordDefinition(word, meanings, phonetic);
  handleSetPhoneticAudio(phonetics);
}

PHONETIC_LISTEN_BUTTON.addEventListener('click', audio.playAudio);
function handleSetPhoneticAudio(phonetics) {
  if (phonetics && phonetics.length) {
    audio.setAudio(phonetics[0].audio);
    PHONETIC_LISTEN_BUTTON.style.visibility = 'visible';
  } else {
    PHONETIC_LISTEN_BUTTON.style.visibility = 'hidden';
  }
}

function renderWordDefinition(word, meanings, phonetic) {
  document.title = word;
  WORD_ELEMENT.innerText = word;
  PHONETIC_ELEMENT.innerText = phonetic;
  renderMeanings(MEANINGS_ELEMENT, meanings);
}

function renderMeanings(container, meanings) {
  meanings.forEach((meaning) => {
    const meaningContainer = createElement('div', 'meaning');

    const pts = createElement('b', 'meaning__pts', meaning.partOfSpeech);
    meaningContainer.appendChild(pts);

    meaning.definitions.forEach((def) => {
      const definition = createElement('p', 'meaning__def', def.definition);
      meaningContainer.appendChild(definition);

      const example = createElement('p', 'meaning__example', def.example);
      meaningContainer.appendChild(example);
    });

    container.appendChild(meaningContainer);
  });
}