<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  rank: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: false,
  },
})
const isTop = computed(() => props.rank > 0 && props.rank <= 3 && props.active);
</script>

<template>
  <div class="base-rank" :class="{ [`rank-${props.rank}`]: isTop }">
    <div v-if="isTop" class="base-rank__ribbon"></div>
    <div class="base-rank__medal"></div>
    <span class="base-rank__num">{{ rank > 0 ? rank : '> 10' }}</span>
  </div>
</template>

<style lang="styl" scoped>
makeMedal($base) {
  box-shadow: inset 0 0 0 darken($base, 15%), 2px 2px 0 rgba(0, 0, 0, 0.08);
  border-color: lighten(spin($base, 10deg), 10%);
  text-shadow: 2px 2px 0 darken($base, 20%);
  background: linear-gradient(to bottom right, $base 50%, darken($base, 5%) 50%);
}
makeRibbon($base) {
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    border-style: solid;
    border-width: 3px 8px;
    width: 0;
    height: 10px;
    top: 36px;
  }

  &::before {
    border-color: $base $base transparent $base;
    left: 3px;
    transform: rotate(20deg) translateZ(-32px);
  }

  &::after {
    left: 22px;
    border-color: darken($base, 10%) darken($base, 10%) transparent darken($base, 10%);
    transform: rotate(-20deg) translateZ(-48px);
  }
}
.base-rank {
  position: relative;
  z-index: 1;
  position: relative;
  circle(40px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  color: $color-base.white;
  font-weight: $font-weight-bold;


  &__ribbon {
    absolute(0px, 0px);
    z-index: 1;
    makeRibbon($color-red.base);
  }

  &__medal {
    absolute(0px, 0px);
    circle(100%);
    z-index: 2;
    border-width: 0.2em;
    border-style: solid;
    makeMedal($color-blue-grey.lighten-4);

    ^[-1].rank-1 & {
      makeMedal($color-yellow.accent-4);
    }
    ^[-1].rank-2 & {
      makeMedal($color-grey.lighten-2);
    }
    ^[-1].rank-3 & {
      makeMedal($color-orange.darken-1);
    }
  }

  &__num {
    position: relative;
    z-index: 3;
  }
}
</style>