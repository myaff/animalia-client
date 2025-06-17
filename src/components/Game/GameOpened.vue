<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue';
import GameElement from '@/components/Game/GameElement.vue';
import type { GameElement as GameElementType } from '@/model/game.model';
import { reactive, ref, watch, type PropType } from 'vue';

defineProps({
  list: {
    type: Array as PropType<GameElementType[]>,
    default: () => [],
  },
})
const emits = defineEmits(['select']);
const selected = reactive<Set<GameElementType>>(new Set());
const multiselectMode = ref(false);
const onClick = (item: GameElementType) => {
  emits('select', [item]);
}
const onSelect = (item: GameElementType) => {
  if (selected.has(item)) selected.delete(item);
  else selected.add(item);
}
const onLongClick = (item: GameElementType) => {
  multiselectMode.value = true;
  selected.add(item);
}
const onClear = () => {
  selected.clear();
}
const onApply = () => {
  emits('select', Array.from(selected));
  selected.clear();
}
watch(() => selected.size, value => {
  if (!value) multiselectMode.value = false;
});
</script>

<template>
  <div class="game-opened">
    <div class="game-opened__trigger">
      <slot name="SwipeTrigger"></slot>
    </div>
    <div class="game-opened__window">
      <div class="game-opened__panel">
        <BaseButton v-if="selected.size" @click="onClear">
          Clear ({{ selected.size }})
        </BaseButton>
        <BaseButton v-if="selected.size" @click="onApply">
          Apply ({{ selected.size }})
        </BaseButton>
      </div>
      <div class="game-opened__list">
        <div
          v-for="item in list"
          :key="item.id"
          class="game-opened__item"
          :class="{ selectable: multiselectMode, selected: selected.has(item) }">
          <GameElement
            :item="item"
            class="game-opened__element"
            @click="multiselectMode ? onSelect(item) : onClick(item)"
            @longclick="onLongClick(item)" />
        </div>
      </div>
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

  &__window {
    background: var(--bg);
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px 10px;
  }

  &__panel {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__item {
    position: relative;

    &.selectable::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid black;
    }
    &.selected::after {
      background: blue;
    }
  }

  &__element {
    transition: opacity .3s ease;
    .selectable & {
      opacity: 0.5;
    }
    .selected & {
      opacity: 1;
    }
  }
}
</style>