import browser from 'webextension-polyfill';

export function openOptionsPage() {
  browser.runtime.openOptionsPage();
}
