<script setup lang="ts">
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
    validator: value => ['text', 'password', 'email'].includes(value),
  },
});
const emits = defineEmits(['update:modelValue']);
const uid = computed(() => props.id ?? Date.now());
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
      <input :id="uid" :model-value="internalValue" :type="type">
    </label>
  </div>
</template>