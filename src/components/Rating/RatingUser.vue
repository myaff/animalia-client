<script setup lang="ts">
import type { RatedUser } from '@/model/user.model';
import type { PropType } from 'vue';

defineProps({
  user: {
    type: Object as PropType<RatedUser>,
    required: true,
  }
});
</script>

<template>
  <div class="rating-user">{{ user.username }}</div>
</template>