<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch, useId } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'password', 'email'].includes(value),
  },
});
const emits = defineEmits(['update:modelValue']);
const fallbackId = useId();
const uid = computed(() => props.id || fallbackId);
const internalValue = ref(props.modelValue);
watch(() => props.modelValue, value => {
  internalValue.value = value;
});
watch(internalValue, value => {
  emits('update:modelValue', value);
});
</script>

<template>
  <div class="base-input">
    <label :for="uid" class="base-input__label">
      <span class="base-input__label-text">
        <slot name="Label">{{ label }}</slot>
      </span>
      <input
        :id="uid"
        v-model="internalValue"
        :type="type"
        class="base-input__field">
    </label>
  </div>
</template>

<style lang="stylus" scoped>
.base-input {
  &__field {
    border: 1px solid gray;
    padding: 4px 8px;
  }
}
</style>