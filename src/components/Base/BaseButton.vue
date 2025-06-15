<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['click']);
</script>

<template>
  <button class="base-button" @click="emits('click')">
    <slot>{{ title }}</slot>
  </button>
</template>