<script setup lang="ts">
import type { GameProgress } from '@/model/game.model';
import type { PropType } from 'vue';

defineProps({
  progress: {
    type: Object as PropType<GameProgress>,
    default: () => ({ opened: 0, total: 0, }),
  },
})
</script>

<template>
  <div class="base-progress">
    <div v-if="$slots.default" class="mr-4 note-text">
      <slot></slot>
    </div>
    <div class="medium-text">{{ progress.opened }}</div>
    <div class="note-text"> / {{ progress.total }}</div>
  </div>
</template>

<style lang="stylus" scoped>
.base-progress {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>