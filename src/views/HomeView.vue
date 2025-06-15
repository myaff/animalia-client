<script setup lang="ts">
import GameField from '@/components/Game/GameField.vue';
import GameOpened from '@/components/Game/GameOpened.vue';
import { useGameStore } from '@/stores/game';
import { computed, ref } from 'vue';
import type { GameElement } from '@/model/game.model';
import { useDraggable, useWindowSize } from '@vueuse/core';

const gameStore = useGameStore();
gameStore.getOpened();
const opened = computed(() => gameStore.opened);
const onField = ref<GameElement[]>([]);
const openedPanelEl = ref();
const { height } = useWindowSize();
const OFFSET = 50;
const top = ref(height.value - OFFSET);
useDraggable(openedPanelEl, {
  preventDefault: true,
  axis: 'y',
  onMove: (position) => {
    if (position.y >= OFFSET && position.y <= height.value) {
      top.value = position.y - OFFSET;
    }
  },
  onEnd: (position) => {
    if (position.y < height.value / 2) top.value = 0;
    else top.value = height.value - OFFSET;
  },
});
const onSelect = (items: GameElement[]) => {
  top.value = height.value - OFFSET;
  onField.value.push(...items);
}
</script>

<template>
  <main class="home-view game">
    <GameField :list="onField" class="game__field" />
    <GameOpened
      :list="opened"
      class="game__opened"
      :style="{ top: top + 'px' }"
      @select="(items: GameElement[]) => onSelect(items)">
      <template #SwipeTrigger>
        <div ref="openedPanelEl" class="game__swipe-trigger"></div>
      </template>
    </GameOpened>
  </main>
</template>

<style lang="stylus" scoped>
.game {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  overflow: hidden;

  &__field {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__opened {
    position: absolute;
    width: 100%;
    height: 100%;
    --offset: 50px;
    --bg: coral;
    top: calc(100% - var(--offset));
    left: 0;
    z-index: 50;
  }

  &__swipe-trigger {
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      display: block;
      width: 50px;
      height: 6px;
      border-radius: 3px;
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg);
    }
  }
}
</style>
