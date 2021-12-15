<template>
  <transition name="fade">
    <div v-if="modelValue" class="overlay" @click.self="handleCloseOnOverlay">
      <div class="modal">
        <div class="modal__header">
          <div>
            <h3 v-if="title" class="title">{{ title }}</h3>
            <small v-if="subtitle" class="subtitle">{{ subtitle }}</small>
          </div>

          <button v-if="showClose" class="close-btn" @click="handleClose">
            <i-ic-round-close />
          </button>
        </div>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      default: '',
    },

    subtitle: {
      type: String,
      default: '',
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    closeOnOverlay: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    function handleCloseOnOverlay() {
      if (props.closeOnOverlay) {
        handleClose();
      }
    }

    function handleClose() {
      emit('update:modelValue', false);
    }

    return {
      handleCloseOnOverlay,
      handleClose,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 95%;
  padding: 20px;
  border: 1px solid hsla(var(--color-raw), 0.1);
  border-radius: 10px;
  background: var(--bg-color);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-size: 1rem;
}
.subtitle {
  display: inline-block;
  margin-top: 5px;
  font-size: 0.75rem;
  color: hsla(var(--color-raw), 0.5);
}

.close-btn {
  display: inline-flex;
  padding: 2px;
  border: none;
  font-size: 1rem;
  border-radius: 4px;
  background-color: hsla(var(--color-raw), 0.1);
  color: hsla(var(--color-raw), 0.4);
  transition: background-color 0.13s ease-in-out;
}
.close-btn:hover {
  background-color: hsla(var(--color-raw), 0.2);
}
</style>
