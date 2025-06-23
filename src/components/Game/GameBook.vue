<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import BaseModal from '../Base/BaseModal.vue';
import { computed, ref, watch } from 'vue';
import BaseHeadPic from '../Base/BaseHeadPic.vue';
import BaseCombination from '../Base/BaseCombination.vue';
import GameBookElement from './GameBookElement.vue';
import useCategoryTabs from '@/composables/useCategoryTabs';
import BaseTabsPanel from '../Base/BaseTabsPanel.vue';
import type { GameElementOpened } from '@/model/game.model';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue']);

const gameStore = useGameStore();
const opened = computed(() => gameStore.opened);
const elementsIndex = computed(() => gameStore.elementsIndex);
const activeElement = ref<GameElementOpened | null>(null);
const activeElementCombination = computed(() => {
  if (!activeElement.value) return [];
  return activeElement.value.consistOf
    .map(id => elementsIndex.value.get(id))
    .filter(item => !!item);
})
const onClick = (item: GameElementOpened) => {
  activeElement.value = item;
}
const resetActive = () => {
  activeElement.value = null;
}
watch(() => props.modelValue, value => {
  if (!value) resetActive();
})

const { tabs, filtered, activeTab } = useCategoryTabs(opened);
const alphabetical = computed(() => {
  const sorted = [...filtered.value].sort((a, b) => a.name > b.name ? 1 : -1);
  return sorted.reduce((acc, item) => {
    const letter = item.name.slice(0, 1);
    if (!acc.has(letter)) acc.set(letter, []);
    const current = acc.get(letter) as GameElementOpened[];
    current.push(item);
    return acc;
  }, new Map<string, GameElementOpened[]>());
})
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    picture="/pics/book1.png"
    class="game-book"
    @update:model-value="value => emits('update:modelValue', value)">
    <template #headerAfter>
      <BaseHeadPic
        v-if="activeElement"
        :title="activeElement.name"
        :picture="activeElement.img"
        show-back
        @back="resetActive()" />
      <BaseTabsPanel v-else v-model="activeTab" :list="tabs" />
    </template>
    <div class="game-book__content pa-20">
      <div v-if="activeElement" class="game-book__element">
        <BaseCombination class="game-book__element-combination" :list="activeElementCombination" />
        <div class="game-book__element-description standart-text" v-html="activeElement.description"></div>
      </div>
      <div v-else class="game-book__lists">
        <div
          v-for="group in alphabetical"
          :key="group[0]"
          class="game-book__group py-8">
          <div class="game-book__letter big-title text-upper mt-12">{{ group[0] }}</div>
          <div class="game-book__list">
            <GameBookElement
              v-for="item in group[1]"
              :key="item.id"
              :item="item"
              class="game-book__item py-8"
              @click="onClick(item)" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="styl" scoped>
.game-book {
  &__group {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    border-bottom: 1px solid $color-grey.lighten-2;

    &:last-child {
      border-bottom: 0;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    +breakpoint(sm-and-up) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  &__item {
    +breakpoint(sm-and-up) {
      flex: 1;
      max-width: 100%;
    }
  }
}
</style>