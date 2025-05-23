export enum CellType {
  EMPTY = 'empty',
  EVENT = 'event',
  BONUS = 'bonus',
  ACTION = 'action',
  RISK = 'risk'
}

export interface Cell {
  id: number;
  type: CellType;
  message?: string;
}

export interface Player {
  position: number;
  level: number;
  lastRollTime: number;
  canRoll: boolean;
  avatarIndex: number;
}

export interface GameState {
  player: Player;
  cells: Cell[];
  message: string;
  showPopup: boolean;
  popupMessage: string;
  popupTitle: string;
}