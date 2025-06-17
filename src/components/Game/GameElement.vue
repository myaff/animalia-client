<script setup lang="ts">
import type { GameElement } from '@/model/game.model';
import { ref, type PropType } from 'vue';

defineProps({
  item: {
    type: Object as PropType<GameElement>,
    required: true,
  },
});
const emits = defineEmits(['click', 'longclick', 'dblclick']);
let clickTimer: ReturnType<typeof setTimeout>;
const LONG_CLICK_DURATION = 500;
const longTriggered = ref(false);
const onClickStart = () => {
  clickTimer = setTimeout(onLongClick, LONG_CLICK_DURATION);
}
const onClickEnd = () => {
  clearTimeout(clickTimer);
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
    @dblclick="emits('dblclick')"
    @mousedown="onClickStart"
    @touchstart="onClickStart"
    @mouseup="onClickEnd"
    @touchend="onClickEnd">
    <div class="game-element__name">{{ item.name }}</div>
  </div>
</template>

<style lang="stylus" scoped>
.game-element {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid red;
  background: gray;
  user-select: none;

  &__name {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    text-align: center;
  }
}
</style>