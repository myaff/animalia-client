<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="base-stat">
    <div class="base-stat__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="base-stat__value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<style lang="styl" scoped>
.base-stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>