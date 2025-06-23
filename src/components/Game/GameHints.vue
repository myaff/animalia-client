<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import BaseModal from '../Base/BaseModal.vue';
import { computed, ref, watch } from 'vue';
import BaseLoader from '../Base/BaseLoader.vue';
import BaseButton from '../Base/BaseButton.vue';
import BaseHeadPic from '../Base/BaseHeadPic.vue';
import { useUserStore } from '@/stores/user';
import type { GameElement } from '@/model/game.model';
import BaseCombination from '../Base/BaseCombination.vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue']);
const userStore = useUserStore();
const gameStore = useGameStore();
const gameIsOver = computed(() => {
  const progress = userStore.user?.progress;
  return !!progress && progress?.opened === progress?.total;
});
const hints = computed(() => gameStore.hints);
const activeIndex = ref(0);
const activeElement = computed(() => hints.value[activeIndex.value]);
const hasPrev = computed(() => hints.value.length && activeIndex.value > 0);
const hasNext = computed(() => hints.value.length && activeIndex.value < hints.value.length - 1);
const title = computed(() => {
  if (activeElement.value) return activeElement.value.name;
  return gameIsOver.value ? 'Вы выиграли!' : 'Подсказка недоступна';
})
const combination = computed(() => {
  if (!activeElement.value) return [];
  const arr: Pick<GameElement, 'name' | 'img'>[] = [];
  for (let i = 0; i < activeElement.value.numberOfElements; i++) {
    arr.push({ name: '', img: '/pics/unknown.png' });
  }
  return arr;
})
const isLoading = ref(false);
watch(() => props.modelValue, value => {
  if (value) {
    isLoading.value = true;
    gameStore.getHints().finally(() => isLoading.value = false);
  } else {
    activeIndex.value = 0;
  }
})
const prev = () => {
  if (activeIndex.value > 0) activeIndex.value--;
}
const next = () => {
  if (activeIndex.value < hints.value.length - 1) activeIndex.value++;
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    class="game-hints"
    @update:model-value="val => emits('update:modelValue', val)">
    <template #headerAfter>
      <BaseHeadPic
        :title="title"
        :picture="activeElement?.img ?? '/pics/evolution.png'" />
    </template>
    <div class="game-hints__content">
      <Transition name="fade" mode="out-in">
        <BaseLoader v-if="isLoading" class="big-title primary-color" />
        <div v-else-if="!isLoading && activeElement" class="game-hints__item pa-20">
          <BaseCombination v-if="combination.length" :list="combination" />
          <div class="game-hint__description" v-html="activeElement?.description"></div>
        </div>
        <div v-else class="game-hints__no-hint pa-20">
          Подсказок больше нет
        </div>
      </Transition>
    </div>
    <div v-if="hints.length > 1" class="game-hints__footer pa-8">
      <BaseButton
        icon="arrow_back"
        size="small"
        :disabled="!hasPrev"
        title="Предыдущая"
        @click="prev" />
      <BaseButton
        icon="arrow_forward"
        size="small"
        :disabled="!hasNext"
        title="Следующая"
        reverse
        @click="next" />
    </div>
  </BaseModal>
</template>

<style lang="styl" scoped>
.game-hints {
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__item {
    flex: 1;
    width: 100%;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}
</style>