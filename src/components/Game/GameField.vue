<script setup lang="ts">
import GameElement from '@/components/Game/GameElement.vue';
import BaseButton from '@/components/Base/BaseButton.vue';
import type { GameElementMaybeStyled, GameElementStyled } from '@/model/game.model';
import { useElementBounding, type Position } from '@vueuse/core';
import { UseDraggable } from '@vueuse/components';
import { computed, ref, watch, type PropType } from 'vue';

const props = defineProps({
  list: {
    type: Array as PropType<GameElementMaybeStyled[]>,
    default: () => [],
  },
});
const emits = defineEmits(['intersection', 'duplicate', 'delete', 'clear']);
const areaEl = ref();
const { width: areaWidth, height: areaHeight, x: areaX, y: areaY } = useElementBounding(areaEl);
const SIZE = 50;
const INTERSECTION = 0.8;
const X_GAP = 10;
const Y_GAP = 20;
const grid = computed(() => {
  const cols = Math.floor(areaWidth.value / (SIZE + X_GAP));
  const rows = Math.floor(areaHeight.value / (SIZE + Y_GAP));
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
  const elInIndex = elementsIndex.get(elem.key);
  if (elInIndex) return elInIndex;
  const selfPos = elem?.x !== undefined && elem?.y !== undefined ? elem : null;
  const gridPos = selfPos ?? grid.value.at(index % grid.value.length);
  const pos = { x: gridPos?.x ?? 0, y: gridPos?.y ?? 0, size: SIZE };
  const elementStyled = { ...elem, ...pos };
  elementsIndex.set(elem.key, elementStyled);
  return elementStyled;
}
watch(() => props.list, value => {
  styledList.value = [...value.map((elem, i) => getElementWithPosition(elem, i))];
  if (!value.length) elementsIndex.clear();
}, { immediate: true, deep: true });

const isDeleting = ref(false);
const deletingEl = ref();
const { x: delX, y: delY, width: delWidth, height: delHeight } = useElementBounding(deletingEl);

const getIntersectionBounds = (item: GameElementStyled) => {
  const half = item.size * INTERSECTION;
  const left = Math.max(item.x - half, 0);
  const top = Math.max(item.y - half, 0);
  const right = Math.min(item.x + item.size + half, areaWidth.value);
  const bottom = Math.min(item.y + item.size + half, areaHeight.value);
  return { top, left, bottom, right };
}
const isIntersecting = (item: GameElementStyled, other: GameElementStyled) => {
  const bounds = getIntersectionBounds(item);
  return other.x >= bounds.left
    && other.y >= bounds.top
    && other.x + item.size <= bounds.right
    && other.y + item.size <= bounds.bottom;
}
const isInDeleteArea = (item: Pick<GameElementStyled, 'x' | 'y' | 'size'>) => {
  return item.x >= delX.value - areaX.value
    && item.y >= delY.value - areaY.value
    && item.x + item.size <= delX.value + delWidth.value - areaX.value
    && item.y + item.size <= delY.value + delHeight.value - areaY.value;
}
const getFinalPos = (pos: Position, size: number) => {
  return {
    x: Math.min(Math.max(pos.x, 0), areaWidth.value - size),
    y: Math.min(Math.max(pos.y, 0), areaHeight.value - size),
  };
}
const onDrag = (item: GameElementStyled, pos: Position) => {
  elementsIndex.set(item.key, Object.assign(item, getFinalPos(pos, item.size)));
  isDeleting.value = isInDeleteArea(item);
}
const onDragEnd = (item: GameElementStyled, pos: Position) => {
  elementsIndex.set(item.key, Object.assign(item, getFinalPos(pos, item.size)));
  isDeleting.value = isInDeleteArea(item);
  if (isDeleting.value) {
    emits('delete', item);
    isDeleting.value = false;
  } else {
    const intersections = styledList.value.filter(el => isIntersecting(item, el));
    if (intersections.length > 1) emits('intersection', intersections);
  }
}
const onDblClick = (item: GameElementStyled) => {
  emits('duplicate', item);
}
const onClear = () => {
  emits('clear');
}
</script>

<template>
  <div class="game-field">
    <div ref="areaEl" class="game-field__area">
      <template v-for="item in styledList" :key="item.key">
        <UseDraggable
          v-slot="{ isDragging }"
          :initial-value="{ x: item.x, y: item.y }"
          :container-element="areaEl"
          :on-move="(pos: Position) => onDrag(item, pos)"
          :on-end="(pos: Position) => onDragEnd(item, pos)"
          :style="{ top: `${item.y}px`, left: `${item.x}px` }"
          class="game-field__draggable">
          <GameElement
            :item="item"
            class="game-field__element"
            :class="{ dragging: isDragging }"
            :style="{ zIndex: isDragging ? 5 : 1 }"
            @dblclick="onDblClick(item)" />
        </UseDraggable>
      </template>
      <div
        ref="deletingEl"
        class="game-field__removing"
        :class="{ active: isDeleting }">
        <BaseButton @click="onClear">Clear</BaseButton>
      </div>
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

    &.dragging {
      cursor: grabbing;
    }
  }

  &__draggable {
    position: absolute;
    cursor: grab;
  }

  &__removing {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    background: lightpink;
    transition: background .3s ease;

    &.active {
      background: red;
    }
  }
}
</style>