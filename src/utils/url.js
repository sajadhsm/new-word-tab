export function getUrlHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return;
  }
}
