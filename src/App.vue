<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app__content">
    <div class="app__view">
      <RouterView />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.app {
  &__content,
  &__view {
    width: 100%;
  }
}
</style>
