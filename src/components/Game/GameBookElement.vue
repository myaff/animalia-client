<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import type { PropType } from 'vue';

defineProps({
  item: {
    type: Object as PropType<Pick<GameElement, 'name' | 'img'>>,
    required: true,
  },
});
const emits = defineEmits(['click']);
</script>

<template>
  <div class="game-book-element" @click="emits('click')">
    <div class="game-book-element__pic">
      <img :src="item.img" :alt="item.name" class="game-book-element__img" />
    </div>
    <div class="game-book-element__name standart-title">{{ item.name }}</div>
  </div>
</template>

<style lang="styl" scoped>
.game-book-element {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  &__pic {
    size(60px, 60px);
  }

  &__img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  &__name {
    position: relative;

    &:first-letter {
      text-transform: uppercase;
    }
  }
}
</style>