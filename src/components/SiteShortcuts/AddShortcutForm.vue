<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label class="form__label">
      Name
      <input v-model="formModel.name" class="form__input" />
    </label>

    <label class="form__label">
      URL
      <input v-model="formModel.url" class="form__input" />
    </label>

    <div class="form__footer">
      <button type="button" class="form__cancel-btn" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="form__submit-btn" :disabled="!isFormValid">
        Done
      </button>
    </div>
  </form>
</template>

<script>
import { ref, unref, computed } from 'vue';

import useShortcuts from '@/composables/useShortcuts';

const SHORTCUT_SCHEMA = {
  name: '',
  url: '',
};

export default {
  name: 'AddShortcutForm',

  props: {
    shortcut: {
      type: Object,
      default: null,
    },
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const { addShortcut, editShortcut } = useShortcuts();

    const formModel = ref(
      props.shortcut
        ? { ...unref(props.shortcut) }
        : {
            ...SHORTCUT_SCHEMA,
          }
    );

    const isFormValid = computed(
      () => formModel.value.name && formModel.value.url
    );

    function handleCancel() {
      emit('cancel');
      clearForm();
    }

    function handleSubmit() {
      if (isFormValid.value) {
        const { name, url } = formModel.value;

        if (props.shortcut) {
          editShortcut(props.shortcut.value.url, name, url);
        } else {
          addShortcut(name, url);
        }

        emit('submit');
        clearForm();
      }
    }

    function clearForm() {
      formModel.value = { ...SHORTCUT_SCHEMA };
    }

    return {
      formModel,
      isFormValid,
      handleSubmit,
      handleCancel,
    };
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.form__label {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 0.6rem;
  font-weight: bold;
  color: hsla(var(--color-raw), 0.7);
}
.form__input {
  margin-top: 5px;
  background-color: hsla(var(--color-raw), 0.1);
  color: var(--color);
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 7px 10px;
}
.form__input:focus {
  outline: 1px solid hsla(var(--color-raw), 0.3);
}

.form__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.form__footer button {
  padding: 7px 15px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: inherit;
}

.form__submit-btn {
  margin-left: 10px;
  border: 1px solid var(--color);
  background-color: var(--color);
  color: var(--bg-color);
}
.form__submit-btn:hover {
  background-color: hsla(var(--color-raw), 0.9);
}
.form__submit-btn:disabled {
  background-color: var(--color);
  cursor: not-allowed;
  opacity: 0.5;
}

.form__cancel-btn {
  border: 1px solid hsla(var(--color-raw), 0.3);
  background-color: transparent;
  color: var(--color);
}
.form__cancel-btn:hover {
  background-color: hsla(var(--color-raw), 0.05);
}
</style>
