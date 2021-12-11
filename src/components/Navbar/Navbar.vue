<template>
  <div class="navbar">
    <Search />
    <ThemeSwitch class="btn-gap" />
    <Options class="btn-gap" />
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

<style scoped>
.navbar {
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
}

.btn-gap {
  margin-left: 5px;
}
</style>
