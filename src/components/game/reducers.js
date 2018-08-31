export const GAME_LOAD = 'GAME_LOAD';
export const MOVE_LOAD = 'MOVE_LOAD';

export const getGame = state => state.game;
export const getMoves = state => state.moves;

export function game(state = null, { type, payload }) {
  return type === GAME_LOAD ? payload : state;
}

export function moves(state = [], { type, payload }) {
  switch(type) {
    case MOVE_LOAD:
      return payload;
    case GAME_LOAD:
      return [];
    default:
      return state;
  }
}