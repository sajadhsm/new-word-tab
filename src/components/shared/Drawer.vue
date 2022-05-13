<template>
  <Teleport to="body">
    <transition name="fade" @after-enter="handleShowDrawer">
      <div v-if="isOpen" class="overlay" @click.self="handleCloseDrawer">
        <transition name="slide" @after-leave="$emit('close')">
          <div v-show="isShowingDrawer" class="drawer">
            <div class="drawer__header">
              <h4 class="drawer__title">{{ title }}</h4>

              <button
                class="btn drawer__close"
                title="Close"
                @click="handleCloseDrawer"
              >
                <i-ic-round-close />
              </button>
            </div>

            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ title: string; isOpen: boolean }>();

const emit = defineEmits(['open', 'close']);

const isShowingDrawer = ref(false);

function handleShowDrawer() {
  isShowingDrawer.value = true;
  emit('open');
}

function handleCloseDrawer() {
  isShowingDrawer.value = false;
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2;
}
.drawer {
  position: absolute;
  right: 0;
  height: 100vh;
  padding: 10px 15px;
  background-color: var(--bg-color);
  max-width: 350px;
  width: 100%;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.3);
}

/* START Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.08s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
/* END Animations */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  color: var(--color);
  background-color: transparent;
}

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 15px;
}

.drawer__title {
  margin: 0;
  font-size: 1rem;
}

.drawer__close {
  font-size: 1.25rem;
  color: hsla(var(--color-raw), 0.5);
  background-color: hsla(var(--color-raw), 0.1);
  border-radius: 4px;
}
.drawer__close:hover {
  transition: background-color ease-in-out 0.13s;
  background-color: hsla(var(--color-raw), 0.2);
}
</style>
