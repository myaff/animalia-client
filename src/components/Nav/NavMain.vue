<script setup lang="ts">
import type { PropType } from 'vue';
import BaseButton from '@/components/Base/BaseButton.vue';

defineProps({
  list: {
    type: Array as PropType<{ title: string; onClick: (...attrs: unknown[]) => void }[]>,
    default: () => [],
  },
})
</script>

<template>
  <nav class="nav-main">
    <BaseButton
      v-for="(item, i) in list"
      :key="i"
      class="nav-main__item"
      @click="item.onClick">
      {{ item.title }}
    </BaseButton>
  </nav>
</template>

<style lang="stylus" scoped>
.nav-main {
  display: flex;
  gap: 20px;
}
</style>