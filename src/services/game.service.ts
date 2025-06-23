import type { RatedUser } from "@/model/user.model";
import { ApiService } from "./api.service";
import type { GameElement, GameElementOpened, GameElementUnknown } from "@/model/game.model";

export default class GameService extends ApiService {
  readonly PIC_PATH = '/pics';
  getOpened() {
    return GameService.api
      .get<GameElementOpened[]>(`${this.apiVersion}/open`)
      .then(res => res.data.map(item => this.transformGameElement(item)));
  }

  getHints() {
    return GameService.api
      .get<GameElementUnknown[]>(`${this.apiVersion}/hints`)
      .then(res => res.data.map(item => this.transformGameElement(item)));
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
      .then(res => res.data.map(item => this.transformGameElement(item)));
  }

  transformGameElement<T extends GameElement>(item: T) {
    return {
      ...item,
      img: item?.img
        ? `${this.PIC_PATH}/${item.img}`
        : `${this.PIC_PATH}/evolution.png`,
    };
  }
}