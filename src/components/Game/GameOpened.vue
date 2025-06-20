<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue';
import GameElement from '@/components/Game/GameElement.vue';
import BaseTabsPanel from '@/components/Base/BaseTabsPanel.vue';
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

const tabs = [
  { title: 'Все', key: 'all' },
  { title: 'Группы', key: 'first' },
  { title: 'Организмы', key: 'second' },
  { title: 'Элементы', key: 'third' },
  { title: 'Способности', key: 'fourth' },
]
const activeTab = ref('all');
</script>

<template>
  <div class="game-opened">
    <div class="game-opened__trigger">
      <slot name="SwipeTrigger"></slot>
    </div>
    <div class="game-opened__window">
      <div class="game-opened__header">
        <BaseTabsPanel :list="tabs" v-model="activeTab" class="pt-12"></BaseTabsPanel>
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
      <div class="game-opened__footer">
        <BaseButton
          v-if="selected.size"
          size="small"
          theme="danger"
          mode="outline"
          icon="delete"
          @click="onClear">
          Очистить
        </BaseButton>
        <BaseButton v-if="selected.size" size="small" @click="onApply">
          Добавить ({{ selected.size }})
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="styl" scoped>
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
  }

  &__footer {
    position: sticky;
    left: 0;
    bottom: 0;
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 16px 10px;

    +breakpoint(sm-and-up) {
      justify-content: flex-end;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    gap: 30px 10px;
    flex: 1;
    padding: 16px 10px;
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