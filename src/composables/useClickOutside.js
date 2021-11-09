import { unref } from 'vue';

export function useClickOutside(target, handler) {
  const listener = (event) => {
    const plain = unref(target);
    const el = plain?.$el ?? plain;

    if (!el) return;

    if (el === event.target || event.composedPath().includes(el)) return;

    handler(event);
  };

  window.addEventListener('pointerdown', listener, { passive: true });
}
