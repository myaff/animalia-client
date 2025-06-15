import { ApiService } from "./api.service";
import type { GameElement } from "@/model/game.model";

export default class GameService extends ApiService {

  getOpened() {
    return GameService.api
      .get<GameElement[]>(`${this.apiVersion}/open`)
      .then(res => res.data);
  }

  getHints() {
    return GameService.api
      .get(`${this.apiVersion}/hints`)
      .then(res => res.data);
  }

  checkCombo(values: (string | number)[]) {
    const params = new URLSearchParams({ elements: '' });
    values.forEach(el => params.append('elements', el.toString()));
    return GameService.api.get(`${this.apiVersion}/check`, { params });
  }
}