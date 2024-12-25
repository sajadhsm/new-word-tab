import type { ComponentPublicInstance, Ref } from 'vue'
import { unref } from 'vue'

type MaybeRef<T> = T | Ref<T>
type MaybeElementRef = MaybeRef<HTMLElement | SVGElement | ComponentPublicInstance | undefined | null>

export function useClickOutside(target: MaybeElementRef, handler: (evt: PointerEvent) => void) {
  const listener = (event: PointerEvent) => {
    const plain = unref(target)
    const el = (plain as ComponentPublicInstance)?.$el ?? plain

    if (!el)
      return

    if (el === event.target || event.composedPath().includes(el))
      return

    handler(event)
  }

  window.addEventListener('pointerdown', listener, { passive: true })
}
