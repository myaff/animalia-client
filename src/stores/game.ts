import type { GameElement } from "@/model/game.model";
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

  watch(token, value => {
    GameService.setAuthToken(value.token);
  })

  const opened = ref<GameElement[]>([]);

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

  function checkCombo(items: GameElement[]) {
    return gameService
      .checkCombo(items.map(item => item.id))
      .then(data => {
        if (data.length) getOpened();
        return data;
      });
  }

  return {
    opened,
    getOpened,
    getRating,
    checkCombo,
  }
});

export type GameStore = ReturnType<typeof useGameStore>;