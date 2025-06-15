import type { GameElement } from "@/model/game.model";
import GameService from "@/services/game.service";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useUserStore } from "./user";

export const useGameStore = defineStore('game', () => {
  const userStore = useUserStore();
  const token = computed(() => userStore.accessToken);
  const gameService = new GameService();
  GameService.setAuthToken(token.value.token);

  watch(token, value => {
    GameService.setAuthToken(value.token);
  })

  const opened = ref<GameElement[]>([]);

  function getOpened() {
    return gameService.getOpened().then(data => {
      opened.value = [...data];
    });
  }

  return {
    opened,
    getOpened,
  }
});