<script setup lang="ts">
import GameField from '@/components/Game/GameField.vue';
import GameOpened from '@/components/Game/GameOpened.vue';
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';
import type { GameElement, GameElementStyled } from '@/model/game.model';
import { useWindowSize } from '@vueuse/core';
import NavMain from '@/components/Nav/NavMain.vue';
import useGame from '@/composables/useGame';
import useDraggablePanel from '@/composables/useDraggablePanel';

const gameStore = useGameStore();
gameStore.getOpened();
const opened = computed(() => gameStore.opened);
const { height } = useWindowSize();
const OFFSET = 50;

const {
  panelEl: openedListPanelEl,
  panelTop: openedListPanelTop,
  panelActive: openedListPanelActive,
  panelDragging: openedLisiPanelDragging,
  setPanelActive: setOpenedListPanelActive,
} = useDraggablePanel({ height, offset: OFFSET });

const {
  fieldList,
  addElements,
  replaceElements,
  duplicateElement,
  deleteElement,
  clearField,
} = useGame();

const onSelect = (items: GameElement[]) => {
  setOpenedListPanelActive(false);
  addElements(items);
}
const onIntersection = (items: GameElementStyled[]) => {
  gameStore.checkCombo(items).then(newList => {
    if (newList.length) replaceElements(items, newList);
  });
}
const onNavClick = (key: string) => console.log(key);
const mainNavList = [
  { title: 'Рейтинг', onClick: () => onNavClick('Rating') },
  // { title: 'Турнир', onClick: () => onNavClick('Tournament') },
  { title: 'Список', onClick: () => setOpenedListPanelActive(true) },
  // { title: 'Энциклопедия', onClick: () => onNavClick('Book') },
  { title: 'Подсказка', onClick: () => onNavClick('Hints') },
]
</script>

<template>
  <main class="home-view game">
    <GameField
      :list="fieldList"
      class="game__field"
      @intersection="onIntersection"
      @duplicate="duplicateElement"
      @delete="deleteElement"
      @clear="clearField" />
    <NavMain :list="mainNavList" class="game__nav-main" />
    <GameOpened
      :list="opened"
      class="game__opened"
      :class="{
        active: openedListPanelActive,
        dragging: openedLisiPanelDragging,
      }"
      :style="{ top: openedListPanelTop + 'px' }"
      @select="onSelect">
      <template #SwipeTrigger>
        <div ref="openedListPanelEl" class="game__swipe-trigger"></div>
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
    z-index: 0;

    &.active,
    &.dragging {
      z-index: 50;
    }

    &:not(.dragging) {
      transition: top 0.5s ease;
    }
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

  &__nav-main {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: darkblue;
    z-index: 40;
  }
}
</style>
