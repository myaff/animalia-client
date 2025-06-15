export interface GameElement {
  id: string | number;
  name: string;
  description?: string;
  img?: string;
}

export interface GamePosition {
  x: number;
  y: number;
  z: number;
}

export type GameElementMaybeStyled = GameElement & Partial<GamePosition>;
export type GameElementStyled = GameElement & GamePosition;