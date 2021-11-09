<template>
  <a
    :href="shortcut.url"
    :title="shortcut.name"
    class="shortcut"
    @contextmenu.prevent="(event) => onContextMenu(event, shortcut)"
  >
    <img
      v-if="shortcut.hostname"
      :src="`https://icons.duckduckgo.com/ip2/${shortcut.hostname}.ico`"
      :alt="shortcut.name"
      width="16"
      height="16"
      class="shortcut__favicon"
    />
    <i-ph-circle-dashed-bold v-else class="shortcut__no-favicon" />
    <small class="shortcut__text">{{ shortcut.name }}</small>
  </a>
</template>

<script>
export default {
  name: 'Shortcut',

  props: {
    shortcut: {
      type: Object,
      required: true,
    },

    onContextMenu: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
.shortcut {
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px;
  text-decoration: none;
}

.shortcut__favicon {
  margin-bottom: 4px;
}
.shortcut__no-favicon {
  margin-bottom: 4px;
  font-size: 16px;
  color: hsla(var(--color-raw), 0.35);
}

.shortcut__text {
  max-width: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.6rem;
  color: hsla(var(--color-raw), 0.75);
}
</style>
