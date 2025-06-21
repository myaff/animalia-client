import type { GameProgress } from "./game.model";

export interface BaseUser {
  username: string;
  progress: GameProgress;
}

export type RatedUser = Pick<BaseUser, 'username' | 'progress'>;