<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import { ref, type PropType } from 'vue';

defineProps({
  item: {
    type: Object as PropType<Pick<GameElement, 'name' | 'img'>>,
    required: true,
  },
});
const emits = defineEmits(['click', 'longclick', 'dblclick']);
let longClickTimer: ReturnType<typeof setTimeout> | null = null;
let doubleClickTimer: ReturnType<typeof setTimeout> | null = null;
const LONG_CLICK_DURATION = 250;
const DOUBLE_CLICK_DURATION = 250;
const longTriggered = ref(false);
const onClickStart = () => {
  if (doubleClickTimer == null) {
    doubleClickTimer = setTimeout(function () {
      doubleClickTimer = null;
      longClickTimer = setTimeout(onLongClick, LONG_CLICK_DURATION);
    }, DOUBLE_CLICK_DURATION)
  } else {
    clearTimeout(doubleClickTimer);
    doubleClickTimer = null;
    emits('dblclick');
  }
}
const onClickEnd = () => {
  if (longClickTimer) clearTimeout(longClickTimer);
  if (!longTriggered.value) emits('click');
  else longTriggered.value = false;
}
const onLongClick = () => {
  emits('longclick');
  longTriggered.value = true;
}
</script>

<template>
  <div
    class="game-element"
    @mousedown="onClickStart"
    @touchstart.prevent="onClickStart"
    @mouseup="onClickEnd"
    @touchend.prevent="onClickEnd"
    @dragstart.prevent>
    <div class="game-element__pic">
      <img :src="item.img" :alt="item.name" class="game-element__img ma-auto" />
    </div>
    <div class="game-element__name mt-4 mx-auto px-2">{{ item.name }}</div>
  </div>
</template>

<style lang="styl" scoped>
.game-element {
  position: relative;
  user-select: none;

  &__pic {
    size(100%, 50px);
  }

  &__img {
    display: block;
    max-width: 50px;
    max-height: 50px;
    object-fit: contain;
    pointer-events: none;
  }

  &__name {
    position: relative;
    text-align: center;
    font-size: 0.75rem;
    max-width: min-content;
    border-radius: $border-radius-small;
    background: var(--element-bg, transparent);

    &:first-letter {
      text-transform: uppercase;
    }
  }
}
</style>