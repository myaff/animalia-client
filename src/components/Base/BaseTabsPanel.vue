<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  list: {
    type: Array as PropType<{ key: string, title: string }[]>,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="base-tabs-panel">
    <div v-if="$slots.default" class="base-tab-panel__before px-8 pt-4">
      <slot></slot>
    </div>
    <div class="base-tabs-panel__list px-8 pt-4">
      <div
        v-for="item in list"
        :key="item.key"
        :class="{ active: item.key === modelValue }"
        class="base-tabs-panel__tab py-8 px-20 standart-title"
        @click="emits('update:modelValue', item.key)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="styl" scoped>
.base-tabs-panel {
  background: $color-grey.lighten-3;

  &__list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    gap: 4px;
    overflow-x: auto;
  }

  &__tab {
    line-height: 1.3;
    border-top-left-radius: $border-radius-medium;
    border-top-right-radius: $border-radius-medium;
    background: $color-grey.lighten-2;
    color: $color-grey.darken-3;
    margin-top: 4px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: $color-blue-grey.lighten-4;
    }

    &.active {
      background: $color-base.white;
      color: $color-grey.darken-4;
      padding-top: 12px;
      margin-top: 0;
    }
  }
}
</style>