<script setup lang="ts">
import type { PropType } from 'vue';
import RatingUser from './RatingUser.vue';
import type { RatedUser } from '@/model/user.model';
defineProps({
  list: {
    type: Array as PropType<RatedUser[]>,
    default: () => [],
  },
})

</script>

<template>
  <div class="rating-list">
    <RatingUser v-for="user in list" :key="user.username" :user="user" />
  </div>
</template>