<script lang="ts">
import { selectedShortcut } from '@/composables/shortcuts/useShortcutContextMenu'

import useShortcuts from '@/composables/shortcuts/useShortcuts'
import { computed, defineComponent, onMounted, ref } from 'vue'

const SHORTCUT_SCHEMA = {
  name: '',
  url: '',
}

export default defineComponent({
  name: 'AddShortcutForm',

  props: {
    shortcut: {
      type: Object,
      default: null,
    },
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const { addShortcut, editShortcut, shortcuts } = useShortcuts()

    const urlInputRef = ref<HTMLInputElement | null>(null)
    onMounted(() => urlInputRef.value?.focus())

    const formModel = ref<typeof SHORTCUT_SCHEMA>(
      selectedShortcut.value
        ? {
            name: selectedShortcut.value.name,
            url: selectedShortcut.value.url,
          }
        : { ...SHORTCUT_SCHEMA },
    )

    const isNameDuplicated = computed(() => {
      const shortcut = shortcuts.value.find(
        ({ name }) => name === formModel.value.name,
      )

      if (!shortcut) {
        return false
      }

      if (selectedShortcut.value) {
        return !(selectedShortcut.value.name === shortcut.name)
      }

      return true
    })

    const isFormValid = computed(() =>
      Boolean(
        formModel.value.name && formModel.value.url && !isNameDuplicated.value,
      ),
    )

    function handleCancel() {
      emit('cancel')
      clearForm()
    }

    function handleSubmit() {
      if (isFormValid.value) {
        const { name, url } = formModel.value

        if (selectedShortcut.value) {
          editShortcut(selectedShortcut.value.name, name, url)
        }
        else {
          addShortcut(name, url)
        }

        emit('submit')
        clearForm()
      }
    }

    function clearForm() {
      formModel.value = { ...SHORTCUT_SCHEMA }
      selectedShortcut.value = null
    }

    return {
      formModel,
      isNameDuplicated,
      urlInputRef,
      isFormValid,
      handleSubmit,
      handleCancel,
    }
  },
})
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label class="form__label">
      Name
      <input
        ref="urlInputRef"
        v-model="formModel.name"
        class="form__input"
        :class="{ 'form__input--error': isNameDuplicated }"
      >
      <small v-if="isNameDuplicated" class="form__error">
        Name is duplicated.
      </small>
    </label>

    <label class="form__label">
      URL
      <input v-model="formModel.url" class="form__input">
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

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.form__label {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  font-size: 0.7rem;
  font-weight: bold;
  color: hsla(var(--color-raw), 0.7);
}
.form__input {
  margin-top: 5px;
  background-color: hsla(var(--color-raw), 0.1);
  color: var(--color);
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 5px;
  padding: 6px 8px;
}
.form__input:focus {
  outline: 1px solid hsla(var(--color-raw), 0.3);
}
.form__input--error,
.form__input--error:focus {
  outline: 1px solid #f44336;
}

.form__error {
  position: absolute;
  bottom: -15px;
  font-size: 0.6rem;
  color: #f44336;
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
