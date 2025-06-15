<script setup lang="ts">
import GameElement from '@/components/Game/GameElement.vue';
import type { GameElementMaybeStyled, GameElementStyled } from '@/model/game.model';
import { useElementBounding } from '@vueuse/core';
import { UseDraggable } from '@vueuse/components';
import { computed, ref, watch, type PropType } from 'vue';

const props = defineProps({
  list: {
    type: Array as PropType<GameElementMaybeStyled[]>,
    default: () => [],
  },
});
const areaEl = ref();
const { width, height } = useElementBounding(areaEl);
const SIZE = 50;
const X_GAP = 10;
const Y_GAP = 20;
const grid = computed(() => {
  const cols = Math.floor(width.value / (SIZE + X_GAP));
  const rows = Math.floor(height.value / (SIZE + Y_GAP));
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push({
        x: x * SIZE + x * X_GAP,
        y: y * SIZE + y * Y_GAP,
      });
    }
  }
  return cells;
});
const styledList = ref<GameElementStyled[]>([]);
const elementsIndex = new Map<string, GameElementStyled>();
const getElementWithPosition = (elem: GameElementMaybeStyled, index: number) => {
  const key = `${elem.id}-${index}`;
  const elInIndex = elementsIndex.get(key);
  if (elInIndex) return elInIndex;
  const selfPos = elem?.x !== undefined && elem?.y !== undefined ? elem : null;
  const gridPos = selfPos ?? grid.value.at(index % grid.value.length);
  const pos = { x: gridPos?.x ?? 0, y: gridPos?.y ?? 0, z: 1 };
  const elementStyled = { ...elem, ...pos };
  elementsIndex.set(key, elementStyled);
  return elementStyled;
}
watch(() => props.list, value => {
  styledList.value = [...value.map((elem, i) => getElementWithPosition(elem, i))];
}, { immediate: true, deep: true });
</script>

<template>
  <div class="game-field">
    <div ref="areaEl" class="game-field__area">
      <template v-for="item in styledList" :key="item.id">
        <UseDraggable
          v-slot="{ isDragging }"
          :initial-value="{ x: item.x, y: item.y }"
          :container-element="areaEl"
          class="game-field__draggable">
          <GameElement
            :item="item"
            class="game-field__element"
            :style="{ zIndex: isDragging ? 5 : item.z }" />
        </UseDraggable>
      </template>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.game-field {
  padding: 50px 20px;

  &__area {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__element {
    position: absolute;
  }

  &__draggable {
    position: absolute;
  }
}
</style>