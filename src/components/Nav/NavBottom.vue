<script setup lang="ts">
import type { PropType } from 'vue';
import BaseIcon from '@/components/Base/BaseIcon.vue';
interface NavItem {
  title?: string;
  icon?: string;
  picture?: string;
  onClick: (...attrs: unknown[]) => void;
}
defineProps({
  list: {
    type: Array as PropType<NavItem[]>,
    default: () => [],
  },
})
</script>

<template>
  <nav class="nav-bottom">
    <div
      v-for="(item, i) in list"
      :key="i"
      :icon="item.icon"
      class="nav-bottom__item text-center py-8 py-12-sm-up py-16-md-up px-4 px-8-sm-up px-16-md-up"
      @click="item.onClick">
      <BaseIcon v-if="item?.icon" :name="item.icon" class="nav-bottom__item-icon" />
      <img v-if="item.picture" :src="item.picture" :alt="item.title" class="nav-bottom__item-img mx-auto" />
      <div class="nav-main__item-title mt-4 py-4 smallest-text">
        {{ item.title }}
      </div>
    </div>
  </nav>
</template>

<style lang="styl" scoped>
.nav-bottom {
  display: flex;
  gap: 4px;
  background: $color-base.white;

  &__item {
    flex: 1;
    cursor: pointer;

    &-img {
      display: block;
      max-width: 40px;
      max-height: 40px;
      object-fit: contain;
    }

    &-title {
      border-radius: 3px;
      background: $color-base.white;
    }
  }
}
</style>