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
      <div class="base-input__label-text medium-title mb-8">
        <slot name="Label">{{ label }}</slot>
      </div>
      <input
        :id="uid"
        v-model="internalValue"
        :type="type"
        class="base-input__field py-16 px-20">
    </label>
  </div>
</template>

<style lang="styl" scoped>
.base-input {
  &__label {

  }
  &__field {
    display: block;
    width: 100%;
    border: 1px solid $color-grey.lighten-2;
    border-radius: $border-radius-base;
    background: $color-grey.lighten-4;
    transition: all 0.3s ease;

    &:focus {
      background: $color-grey.lighten-5;
      border-color: $color-grey.darken-2;
    }
  }
}
</style>