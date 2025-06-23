<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
defineProps({
  title: {
    type: String,
    default: 'Упс!',
  },
  text: {
    type: String,
    default: 'Кажется что-то пошло не так. Попробуйте позднее',
  },
})
</script>

<template>
  <div class="base-error pa-20">
    <div class="base-error__icon">
      <BaseIcon name="error" class="error-color" />
    </div>
    <div v-if="title" class="base-error__title big-title">{{ title }}</div>
    <div class="base-error__text big-text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<style lang="styl" scoped>
.base-error {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-areas: 'iconArea title' 'text text';
  gap: 20px;
  border: 2px solid $error-color;
  border-radius: $border-radius-big;
  background: lighten($error-color, 80%);

  &__icon {
    grid-area: iconArea;
    font-size: 60px;
    line-height: 1;
    align-self: center;
    display: block;
  }

  &__title {
    grid-area: title;
    align-self: center;
  }

  &__text {
    grid-area: text;
  }
}
</style>