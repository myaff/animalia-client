<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import useScreen from '@/composables/useScreen';

defineProps({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  showBack: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['back']);
const { isMobile } = useScreen();
</script>

<template>
  <div class="base-head-pic">
    <BaseButton
      v-if="showBack"
      icon="arrow_back"
      :mode="isMobile ? 'plain' : 'filled'"
      theme="white"
      size="small"
      shape="circle"
      class="base-head-pic__back"
      @click="emits('back', false)" />
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

    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__img {
    display: block;
    max-width: 100%;
    height: 100px;
    object-fit: contain;
  }

  &__back {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    z-index: ($modal-z + 3);

    +breakpoint(sm-and-up) {
      transform: translate(0, 0);
      top: 8px;
      left: 8px;
    }
  }
}
</style>