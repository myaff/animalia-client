<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="base-icon material-symbols-rounded">{{ name }}</span>
</template>

<style lang="stylus" scoped>
.base-icon {
  font-size: 1em;
  vertical-align: middle;
}
</style>