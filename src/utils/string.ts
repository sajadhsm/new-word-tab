export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getWordsOfText(text: string, maxLength = Infinity) {
  return text.split(/\s|,/g).filter((word) => {
    const trimmed = word.trim();
    return trimmed && trimmed.length < maxLength;
  });
}
