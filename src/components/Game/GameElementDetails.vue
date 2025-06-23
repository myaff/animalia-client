<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import { computed, type PropType } from 'vue';
import BaseCombination from '../Base/BaseCombination.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Pick<GameElement, 'description'>>,
    required: true,
  },
  combination: {
    type: Array as PropType<Pick<GameElement, 'name' | 'img'>[]>,
    default: () => [],
  },
})
const text = computed(() => {
  if (!props.item?.description) return '';
  return props.item.description.split('<br/>').map(item => `<p>${item}</p>`).join('');
})
</script>

<template>
  <div class="game-element-details">
    <BaseCombination class="game-element-details__combination" :list="combination" />
    <div v-if="text" class="game-element-details__description mt-16 pt-16 standart-text" v-html="text">
    </div>
  </div>
</template>

<style lang="styl" scoped>
.game-element-details {

  &__description {
    border-top: 1px solid $color-grey.lighten-2;
  }
}
</style>