export interface GameElement {
  id: string | number;
  name: string;
  description?: string;
  img?: string;
}

export interface GameElementOpened extends GameElement {
  consistOf: GameElement['id'][]
}

export interface GameElementIndexed extends GameElement {
  index: number;
  key: string;
}

export interface GamePosition {
  x: number;
  y: number;
  size: number;
}

export type GameElementMaybeStyled = GameElementIndexed & Partial<GamePosition>;
export type GameElementStyled = GameElementIndexed & GamePosition;

export interface GameProgress {
  opened: number;
  total: number;
}