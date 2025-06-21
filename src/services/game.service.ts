import type { RatedUser } from "@/model/user.model";
import { ApiService } from "./api.service";
import type { GameElement, GameElementOpened } from "@/model/game.model";

export default class GameService extends ApiService {

  getOpened() {
    return GameService.api
      .get<GameElementOpened[]>(`${this.apiVersion}/open`)
      .then(res => res.data);
  }

  getHints() {
    return GameService.api
      .get<GameElement[]>(`${this.apiVersion}/hints`)
      .then(res => res.data);
  }

  getRating(limit = 10) {
    return GameService.api
      .get<RatedUser[]>(`${this.apiVersion}/rating`, { params: { limit } })
      .then(res => res.data);
  }

  checkCombo(values: (string | number)[]) {
    const params = new URLSearchParams();
    values.forEach(el => params.append('elements', el.toString()));
    return GameService.api
      .get<GameElement[]>(`${this.apiVersion}/check`, { params })
      .then(res => res.data);
  }
}