<script setup lang="ts">
import GameField from '@/components/Game/GameField.vue';
import GameOpened from '@/components/Game/GameOpened.vue';
import { useGameStore } from '@/stores/game';
import { ref } from 'vue';
import type { GameElement, GameElementStyled } from '@/model/game.model';
import NavBottom from '@/components/Nav/NavBottom.vue';
import NavMain from '@/components/Nav/NavMain.vue';
import RatingList from '@/components/Rating/RatingList.vue';
import useGame from '@/composables/useGame';
import { useUserStore } from '@/stores/user';
import GameHints from '@/components/Game/GameHints.vue';

const userStore = useUserStore();
if (!userStore.user) userStore.getUser();

const gameStore = useGameStore();
gameStore.getOpened();

const {
  fieldList,
  addElements,
  replaceElements,
  duplicateElement,
  deleteElement,
  clearField,
} = useGame();

const onSelect = (items: GameElement[]) => {
  elementsOpened.value = false;
  addElements(items);
}
const onIntersection = (items: GameElementStyled[]) => {
  gameStore.checkCombo(items).then(newList => {
    if (newList.length) replaceElements(items, newList);
  });
}
const navMainOpened = ref(false);
const ratingOpened = ref(false);
const elementsOpened = ref(false);
const hintsOpened = ref(false);
const mainNavList = [
  {
    title: 'Профиль',
    picture: '/pics/cogwheel.png',
    onClick: () => navMainOpened.value = true,
  },
  {
    title: 'Рейтинг',
    picture: '/pics/trophy.png',
    onClick: () => (ratingOpened.value = true),
  },
  {
    title: 'Список',
    picture: '/pics/book.png',
    onClick: () => elementsOpened.value = true,
  },
  {
    title: 'Справка',
    picture: '/pics/book1.png',
    onClick: () => {}
  },
  {
    title: 'Подсказка',
    picture: '/pics/idea.png',
    onClick: () => hintsOpened.value = true,
  },
]
</script>

<template>
  <main class="home-view game">
    <GameField
      :list="fieldList"
      class="game__field"
      @intersection="onIntersection"
      @duplicate="duplicateElement"
      @delete="deleteElement"
      @clear="clearField" />
    <NavBottom :list="mainNavList" class="game__nav-bottom" />
    <NavMain v-model="navMainOpened" />
    <GameOpened v-model="elementsOpened" @select="onSelect" />
    <RatingList v-model="ratingOpened" size="small" />
    <GameHints v-model="hintsOpened" size="small" />
  </main>
</template>

<style lang="styl" scoped>
.game {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: $color-orange.lighten-4;

  &__field {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__nav-bottom {
    width: 100%;
    z-index: 40;
    box-shadow: 0 -2px 0 0 rgba(darken($color-orange.lighten-4, 20%), 0.5);
  }
}
</style>
