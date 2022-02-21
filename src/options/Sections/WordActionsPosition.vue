<template>
  <Section
    title="Word Actions Position"
    description="Change the actions buttons position based on your preference"
  >
    <Select
      v-model="position"
      :options="options"
      title="Select preferred position"
      @change="handleSaveActionPosition"
    />
  </Section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Select from '../components/Select.vue';
import Section from '../components/Section.vue';

import useWordActionsPosition, {
  ActionPositions,
  positionToNameMap,
} from '@/composables/useWordActionsPosition';

const options = Object.values(ActionPositions).map((position) => ({
  text: positionToNameMap[position],
  value: position,
}));

const { actionsPosition, storeActionsPosition } = useWordActionsPosition();

const position = ref(actionsPosition);

function handleSaveActionPosition() {
  storeActionsPosition(position.value);
}
</script>
