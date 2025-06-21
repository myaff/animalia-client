<script lang="ts">
const btnModes = ['filled', 'outlined', 'plain'];
const btnSizes = ['small', 'medium', 'large'];
const btnThemes = ['primary', 'secondary', 'success', 'warning', 'danger', 'white'];
const btnShapes = ['square', 'circle', 'rounded'];
</script>
<script setup lang="ts">
import { defineProps, defineEmits, type PropType, computed, toRefs, useSlots } from 'vue';
import { type RouteLocationAsRelativeGeneric, type RouteLocationAsPathGeneric, RouterLink } from 'vue-router';
import BaseIcon from './BaseIcon.vue';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  mode: {
    type: String as PropType<typeof btnModes[number]>,
    default: 'filled',
    validator: (value: string) => btnModes.includes(value),
  },
  size: {
    type: String as PropType<typeof btnSizes[number]>,
    default: 'medium',
    validator: (value: string) => btnSizes.includes(value),
  },
  theme: {
    type: String as PropType<typeof btnThemes[number]>,
    default: 'primary',
    validator: (value: string) => btnThemes.includes(value),
  },
  shape: {
    type: String as PropType<typeof btnShapes[number]>,
    default: 'rounded',
    validator: (value: string) => btnShapes.includes(value),
  },
  dense: {
    type: Boolean,
    default: false,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object] as PropType<string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric>,
    default: '',
  },
  wide: {
    type: Boolean,
    default: false,
  },
});
const slots = useSlots();
const propsRefs = toRefs(props);
const classes = computed(() => {
  const base = 'base-button';
  return {
    [`${base}--${propsRefs.mode.value}`]: !!propsRefs.mode.value,
    [`${base}--${propsRefs.size.value}`]: !!propsRefs.size.value,
    [`${base}--${propsRefs.theme.value}`]: !!propsRefs.theme.value,
    [`${base}--${propsRefs.shape.value}`]: !!propsRefs.shape.value,
    ['only-icon']: propsRefs.icon.value && (!propsRefs.title.value || slots.default),
    dense: propsRefs.dense.value,
    reverse: propsRefs.reverse.value,
    loading: propsRefs.loading.value,
    wide: propsRefs.wide.value,
  }
});
const tag = computed(() => props.to ? RouterLink : 'button');
const emits = defineEmits(['click']);
</script>

<template>
  <component :is="tag" :to="to" :class="classes" class="base-button" @click="emits('click')">
    <div class="base-button__inner">
      <div v-if="icon" class="base-button__icon">
        <BaseIcon :name="icon" />
      </div>
      <div v-if="$slots.default || title" class="base-button__text">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </component>
</template>

<style lang="styl" scoped>
$bb-colors-primary = {
  base: $primary-color,
  base-text: $color-base.white,
}
$bb-colors-secondary = {
  base: $color-grey.base,
  base-text: $color-base.white,
  plain-text: $color-grey.base,
  active-text: $color-cyan.darken-4,
}
$bb-colors-success = {
  base: $success-color,
  base-text: $color-base.white,
}
$bb-colors-warning = {
  base: $warning-color,
  base-text: $text-color,
}
$bb-colors-danger = {
  base: $error-color,
  base-text: $color-base.white,
}
$bb-colors-white = {
  base: $color-base.white,
  base-text: $color-grey.darken-1,
  base-shade: $color-grey.lighten-2,
}

$bb-colors-tree = {
  primary: $bb-colors-primary,
  secondary: $bb-colors-secondary,
  success: $bb-colors-success,
  warning: $bb-colors-warning,
  danger: $bb-colors-danger,
  white: $bb-colors-white,
};
$bb-themes = {
  filled: generate-filled,
  outlined: generate-outline,
  plain: generate-plain,
}

$bb-size-medium = {
  text: $font-size-base,
  weight: $font-weight-bold,
  height: 24px,
  border: 1px,
  padding: {
    x: 24px,
    y: 16px
  },
}
$bb-size-small = {
  text: $font-size-base,
  weight: $font-weight-medium,
  height: 20px,
  border: 1px,
  padding: {
    x: 20px,
    y: 10px
  }
}
$bb-size-big = {
  text: $font-size-medium,
  weight: $font-weight-bold,
  height: 40px,
  border: 1px,
  padding: {
    x: 32px,
    y: 8px
  }
}
$bb-size-large = {
  text: $font-size-medium,
  weight: $font-weight-bold,
  height: 60px,
  border: 1px,
  padding: {
    x: 32px,
    y: 8px
  }
}
$bb-sizes-tree = {
  medium: $bb-size-medium,
  small: $bb-size-small,
  big: $bb-size-big,
  large: $bb-size-large,
}

.base-button {
  position: relative;
  display: inline-block;
  box-shadow: none;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: $border-radius-base;
  font-family: $font-base;
  font-weight: $font-weight-bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  &.wide {
    width: 100%;
  }

  // shapes
  &--square {
    border-radius: 0;
  }
  &--rounded {
    border-radius: $border-radius-base;
  }

  &__icon {
    pointer-events: none;
    transition: inherit;
    line-height: 1;
    height: 1em;
  }

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    ^[0].reverse & {
      flex-direction: row-reverse;
    }
  }

  &__text {
    pointer-events: none;
    transition: none;

    ^[0]__icon + & {
      margin-left: 12px;

      ^[0].reverse & {
        margin-left: 0
        margin-right: 12px;
      }
    }
  }

  // themes & colors
  for $theme, $mixin in $bb-themes {
    &--{$theme} {
      for $key, $scheme in $bb-colors-tree {
        ^[0]--{$key}& {
          $mixin($scheme, $key)
        }
      }
    }
  }

  // sizes & shapes
  for $key, $size in $bb-sizes-tree {
    &--{$key} {
      $total = $size.height + $size.border * 2 + $size.padding.y * 2;
      $total-dense = $size.height + $size.border * 2 + $size.padding.y;

      min-size($total);
      border-width: $size.border;
      padding: $size.padding.y $size.padding.x;

      &.dense {
        min-size($total-dense);
        padding: ($size.padding.y / 2) ($size.padding.x / 2);
      }

      ^[0]--circle& {
        border-radius: ($total / 2);
      }

      & ^[0]__text {
        font-size: $size.text;
        font-weight: $size.weight;
        line-height: $size.height;
      }

      & ^[0]__icon {
        font-size: $size.text;
      }

      &.only-icon {
        padding: $size.padding.y;

        &.dense {
          padding: ($size.padding.y / 2);
        }

        & ^[0]__icon {
          font-size: $size.height;
        }
      }
    }
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>