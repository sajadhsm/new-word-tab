<template>
  <div class="navbar">
    <Search />
    <ThemeSwitch />
  </div>
</template>

<script>
import ThemeSwitch from './ThemeSwitch.vue';
import Search from './Search.vue';

export default {
  name: 'Navbar',

  components: {
    ThemeSwitch,
    Search,
  },
};
</script>

<style>
.navbar {
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  align-items: center;
}
</style>
