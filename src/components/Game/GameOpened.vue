<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue';
import GameElement from '@/components/Game/GameElement.vue';
import BaseTabsPanel from '@/components/Base/BaseTabsPanel.vue';
import type { GameElement as GameElementType } from '@/model/game.model';
import { computed, reactive, ref, watch } from 'vue';
import BaseModal from '../Base/BaseModal.vue';
import { useGameStore } from '@/stores/game';
import useCategoryTabs from '@/composables/useCategoryTabs';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['select', 'update:modelValue']);
const gameStore = useGameStore();
const opened = computed(() => gameStore.opened);
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
const { tabs, filtered, activeTab } = useCategoryTabs(opened);
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    class="game-opened"
    picture="/pics/book.png"
    @update:model-value="val => emits('update:modelValue', val)">
    <template #headerAfter>
      <BaseTabsPanel
        :list="tabs"
        v-model="activeTab"
        class="pt-12" />
    </template>
    <div class="game-opened__window">
      <div class="game-opened__list">
        <div
          v-for="item in filtered"
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
          mode="outlined"
          icon="delete"
          @click="onClear">
          Очистить
        </BaseButton>
        <BaseButton v-if="selected.size" size="small" @click="onApply">
          Добавить ({{ selected.size }})
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="styl" scoped>
.game-opened {
  &__window {
    background: var(--bg);
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
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
    gap: 16px;
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
      border: 2px solid $color-grey.lighten-2;
    }
    &.selected::after {
      background: $primary-color;
    }
  }

  &__element {
    transition: opacity .3s ease;
    cursor: pointer;

    .selectable & {
      opacity: 0.5;
    }
    .selected & {
      opacity: 1;
    }
  }
}
</style>