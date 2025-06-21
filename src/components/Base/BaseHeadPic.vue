<script setup lang="ts">
defineProps({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="base-head-pic">
    <div class="base-head-pic__pic">
      <img :src="picture" :alt="title" class="base-head-pic__img mx-auto" />
    </div>
    <div class="base-head-pic__title big-title py-12 text-center">
      {{ title }}
    </div>
  </div>
</template>

<style lang="styl" scoped>
.base-head-pic {
  margin-top: 50px;
  height: 70px;

  &__pic {
    absolute(-40px, 50%);
    size(200px, 100px);
    transform: translateX(-50%);
    background: $primary-color;
    border-radius: 100px 100px 0 0;
    border: 4px solid $color-base.white;
    border-bottom-width: 0;
    z-index: 2;
  }

  &__title {
    absolute(56px, 0px, 0, 0px);
    height: 70px;
    background: $primary-color;
    border-radius: $border-radius-big $border-radius-big 0 0;
    border: 4px solid $color-base.white;
    border-bottom-width: 0;
    color: $color-base.white;
    z-index: 1;
  }

  &__img {
    display: block;
    max-width: 100%;
    height: 100px;
    object-fit: contain;
  }
}
</style>