<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import type { PropType } from 'vue';

defineProps({
  item: {
    type: Object as PropType<GameElement>,
    required: true,
  },
});
</script>

<template>
  <div class="game-element">
    <div class="game-element__name">{{ item.name }}</div>
  </div>
</template>

<style lang="stylus" scoped>
.game-element {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: gray;
  user-select: none;

  &__name {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    text-align: center;
  }
}
</style>