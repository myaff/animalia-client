<script setup lang="ts">
import type { RatedUser } from '@/model/user.model';
import type { PropType } from 'vue';
import BaseProgress from '../Base/BaseProgress.vue';
import BaseRank from '../Base/BaseRank.vue';

defineProps({
  user: {
    type: Object as PropType<RatedUser>,
    required: true,
  },
  rank: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="rating-user py-12 px-16">
    <BaseRank :rank="rank" :active="active" />
    <div class="rating-user__name standart-title py-4">
      {{ user.username }}
    </div>
    <BaseProgress :progress="user.progress" class="ml-auto">
      открыто
    </BaseProgress>
  </div>
</template>

<style lang="styl" scoped>

.rating-user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}
</style>