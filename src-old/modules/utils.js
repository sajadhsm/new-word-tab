export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createElement(tag = 'div', className, innerText) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (innerText) element.innerText = innerText;

  return element;
}

export function getElement(selector, container = document) {
  return container.querySelector(selector);
}
