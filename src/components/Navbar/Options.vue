<template>
  <IconButton title="Options" @click="openOptionsPage">
    <i-ic-round-settings />
  </IconButton>
</template>

<script setup lang="ts">
import IconButton from '@/components/shared/IconButton.vue';
import { openOptionsPage } from '@/utils/browser';
</script>
