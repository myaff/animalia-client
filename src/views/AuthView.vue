<script setup lang="ts">
</script>

<template>
  <div class="auth-view">
    <div class="auth-view__page">
      <RouterView />
    </div>
  </div>
</template>

<style lang="styl" scoped>
.auth-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: $color-light-blue.darken-2;
  padding: 50px 20px;

  &__page {
    width: 100%;
    max-width: 500px;
    background: $color-base.white;
    border-radius: $border-radius-big;
    box-shadow: 0 0 5px 5px $color-light-blue.darken-3;

    +breakpoint(md-and-up) {
      max-width: 600px;
    }
  }
}
</style>