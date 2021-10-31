<template>
  <div class="navbar">
    <Search />
    <ThemeSwitch />
    <Options />
  </div>
</template>

<script>
import ThemeSwitch from './ThemeSwitch.vue';
import Options from './Options.vue';
import Search from './Search.vue';

export default {
  name: 'Navbar',

  components: {
    ThemeSwitch,
    Options,
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
