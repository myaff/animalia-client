<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import type { PropType } from 'vue';
import BaseIcon from './BaseIcon.vue';

defineProps({
  list: {
    type: Array as PropType<Pick<GameElement, 'name' | 'img'>[]>,
    default: () => [],
  },
})
</script>

<template>
  <div class="base-combination">
    <template v-for="(item, i) in list" :key="i">
      <BaseIcon v-if="i" name="add" class="base-combination__plus note-color" />
      <div class="base-combination__item">
        <div class="base-combination__pic mx-auto">
          <img :src="item.img" :alt="item.name" class="base-combination__img mx-auto" />
        </div>
        <div class="base-combination__name text-center mt-4">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="styl" scoped>
.base-combination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;

  &__plus {
    font-size: 32px;
  }

  &__pic {
    max-width: 50px;
  }

  &__img {
    display: block;
    max-width: 100%;
    object-fit: contain;
  }

  &__name {
    max-width: min-content;
    &:first-letter {
      text-transform: uppercase;
    }
  }
}
</style>