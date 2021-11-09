<template>
  <ul class="shortcut-context-menu">
    <li>Edit</li>
    <li>Remove</li>
  </ul>
</template>

<script>
export default {
  name: 'ShortcutContextMenu',
};
</script>

<style scoped>
.shortcut-context-menu {
  position: fixed;
  top: 25px;
  left: 25px;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  border-radius: 5px;
  background: var(--bg-color);
  border: 1px solid hsla(var(--color-raw), 0.15);
}
.shortcut-context-menu li {
  min-width: 75px;
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
}
.shortcut-context-menu li:hover {
  background: hsla(var(--color-raw), 0.15);
}
</style>
