<script setup lang="ts">
import useScreen from '@/composables/useScreen';
import BaseButton from './BaseButton.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  picture: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val: string) => ['small', 'medium', 'big'].includes(val),
  },
})
const emits = defineEmits(['update:modelValue']);
const { isMobile } = useScreen();
</script>

<template>
  <Transition name="fade-blur">
    <div v-show="modelValue" class="base-modal" :class="`base-modal--${size}`">
      <div class="base-modal__overlay" @click="emits('update:modelValue', false)"></div>
      <Transition name="bubble">
        <div v-if="modelValue" class="base-modal__window pa-4" :class="{ open: modelValue }">
          <div class="base-modal__heading px-16">
            <img v-if="picture" :src="picture" :alt="title ?? ''" class="base-modal__img">
            <div v-if="$slots.title || title" class="base-modal__title medium-title py-12">
              <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="$slots.headerAfter" class="base-modal__heading-after ml-auto-sm-up">
              <slot name="headerAfter"></slot>
            </div>
            <BaseButton
              icon="close"
              :mode="isMobile ? 'plain' : 'filled'"
              theme="white"
              size="small"
              shape="circle"
              class="base-modal__close"
              @click="emits('update:modelValue', false)" />
          </div>
          <div class="base-modal__content">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="styl" scoped>
.base-modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  z-index: $modal-z;

  +breakpoint(sm-and-up) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color-blue-grey.darken-4, 0.8);
    backdrop-filter: blur(20px);
    z-index: ($modal-z + 1);
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-100%);
    z-index: ($modal-z + 3);

    +breakpoint(sm-and-up) {
      transform: translate(0, 0);
      top: 8px;
      right: 8px;
    }
  }

  &__window {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: ($modal-z + 2);
    background: $color-base.white;
    border-top-right-radius: $border-radius-big;
    border-top-left-radius: $border-radius-big;
    display: flex;
    flex-direction: column;

    +breakpoint(sm-and-up) {
      max-width: 550px;
      height: auto;
      min-height: 400px;
      border-radius: $border-radius-big;
    }

    ^[0]--medium & {
      +breakpoint(sm-and-up) {
        min-height: 600px;
      }
      +breakpoint(md-and-up) {
        max-width: 760px;
      }
    }


  }

  &__heading {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    background: $color-grey.lighten-3;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;

    +breakpoint(sm-and-up) {
      padding-right: 60px;
    }

    &-after {
      max-width: 100%;
      min-width: 0;
      flex: 1;
    }
  }

  &__img {
    display: block;
    max-width: 40px;
    max-height: 40px;
    object-fit: contain;
  }

  &__content {
    max-height: 100%;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>