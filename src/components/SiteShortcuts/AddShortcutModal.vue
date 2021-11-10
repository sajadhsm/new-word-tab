<template>
  <div class="overlay">
    <div class="modal">
      <h3 class="modal__title">
        {{ selectedShortcut ? 'Edit shortcut' : 'Add shortcut' }}
      </h3>

      <AddShortcutForm @submit="closeModal" @cancel="closeModal" />
    </div>
  </div>
</template>

<script>
import AddShortcutForm from './AddShortcutForm.vue';

import useShortcutModal from '@/composables/useShortcutModal';
import { selectedShortcut } from '@/composables/useShortcutContextMenu';

export default {
  name: 'AddShortcutModal',

  components: { AddShortcutForm },

  setup() {
    const { closeModal } = useShortcutModal();

    return { selectedShortcut, closeModal };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  background: var(--bg-color);
  border: 1px solid hsla(var(--color-raw), 0.1);
}

.modal__title {
  margin: 0 0 20px;
  font-size: 1rem;
}

.modal__close-btn {
  background-color: transparent;
  font-size: 1rem;
  border: none;
  display: inline-flex;
  align-items: center;
  color: var(--color);
}
</style>
