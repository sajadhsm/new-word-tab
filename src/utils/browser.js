export function openOptionsPage() {
  const browser = chrome || browser;
  browser.runtime.openOptionsPage();
}
