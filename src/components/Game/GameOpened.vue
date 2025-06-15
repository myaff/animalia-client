<script setup lang="ts">
import GameElement from '@/components/Game/GameElement.vue';
import type { GameElement as GameElementType } from '@/model/game.model';
import type { PropType } from 'vue';

defineProps({
  list: {
    type: Array as PropType<GameElementType[]>,
    default: () => [],
  },
})
const emits = defineEmits(['select']);
const onClick = (item: GameElementType) => {
  emits('select', [item]);
}
</script>

<template>
  <div class="game-opened">
    <div class="game-opened__trigger">
      <slot name="SwipeTrigger"></slot>
    </div>
    <div class="game-opened__list">
      <GameElement
        v-for="item in list"
        :key="item.id"
        :item="item"
        @click="onClick(item)" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.game-opened {
  --offset: 50px;
  --bg: white;
  position: relative;
  padding-top: var(--offset);

  &__trigger {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: var(--offset);
  }

  &__list {
    background: var(--bg);
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    gap: 10px;
    padding: 16px 10px;
  }
}
</style>