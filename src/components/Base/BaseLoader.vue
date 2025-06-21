<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
defineProps({
  icon: {
    type: String,
    default: 'progress_activity',
  },
})
</script>

<template>
  <div class="base-loader">
    <BaseIcon :name="icon" class="base-loader__icon" />
  </div>
</template>

<style lang="styl" scoped>
.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    transform-origin: center;
    animation: rotation infinite 2s linear;
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>