import type { GameElement, GameElementOpened, GameElementUnknown } from "@/model/game.model";
import GameService from "@/services/game.service";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useUserStore } from "./user";
import type { RatedUser } from "@/model/user.model";

export const useGameStore = defineStore('game', () => {
  const userStore = useUserStore();
  const token = computed(() => userStore.accessToken);
  const gameService = new GameService();
  GameService.setAuthToken(token.value.token);

  const rating = ref<RatedUser[]>([]);
  const opened = ref<GameElementOpened[]>([]);
  const hints = ref<GameElementUnknown[]>([]);

  const elementsIndex = computed(() => {
    return opened.value.reduce((acc, item) => {
      acc.set(item.id, item);
      return acc;
    }, new Map<GameElement['id'], GameElement>());
  });

  watch(token, value => {
    GameService.setAuthToken(value.token);
  })


  function getOpened() {
    return gameService.getOpened().then(data => {
      opened.value = [...data];
      return data;
    });
  }

  function getRating() {
    return gameService.getRating().then(data => {
      rating.value = data;
      return data;
    });
  }

  function getHints() {
    return gameService.getHints().then(data => {
      hints.value = data;
      return data;
    })
  }

  function checkCombo(items: GameElement[]) {
    return gameService
      .checkCombo(items.map(item => item.id))
      .then(data => {
        if (data.length) getOpened();
        return data;
      });
  }

  function reset() {
    rating.value = [];
    opened.value = [];
    hints.value = [];
  }

  return {
    opened,
    rating,
    hints,
    elementsIndex,
    getOpened,
    getRating,
    getHints,
    checkCombo,
    reset,
  }
});

export type GameStore = ReturnType<typeof useGameStore>;