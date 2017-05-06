const SWITCH_MOVE = "SWITCH_MOVE";
const CHECK_STATUS = "CHECK_STATUS";
const MAKE_TURN = "MAKE_TURN";
const START_GAME = "START_GAME";
export const RESET_GAME = "RESET_GAME";

const initalState = {
  win: null,
  move: true,
  turn: 1,
  filled: 0,
  in_progress: false
};

export default function statusReducer(state = initalState, action) {
  switch (action.type) {
    case SWITCH_MOVE:
      return Object.assign({}, state, {
        move: !state.move,
        filled: state.filled + 1
      });
    case CHECK_STATUS:
      return checkGame(state, action.board, action.id);
    case MAKE_TURN:
      return Object.assign({}, state, { turn: state.turn + 1 });
    case RESET_GAME:
      return Object.assign({}, initalState);
    case START_GAME:
      return Object.assign({}, state, { in_progress: true });
    default:
      return state;
  }
}

export function switchMove() {
  return {
    type: SWITCH_MOVE
  };
}

export function checkStatus(id, board) {
  return {
    type: CHECK_STATUS,
    id,
    board
  };
}

export function incrementTurn() {
  return {
    type: MAKE_TURN
  };
}

export function startGame() {
  return {
    type: START_GAME
  };
}

export function resetGame() {
  return {
    type: RESET_GAME
  };
}

function checkGame(state, board, id) {
  if (
    checkLine(id, checkVerticalCell, board) ||
    checkLine(id, checkHorizontalCell, board) ||
    checkLine(id, checkDiagonalLeftCell, board) ||
    checkLine(id, checkDiagonalRightCell, board)
  ) {
    return Object.assign({}, state, { win: board[id] });
  }
  return state;
}

function checkLine(currentId, fun, board) {
  for (let i = 0; i < 5; i++) {
    if (
      board[currentId] === fun(currentId, 0 - i, board) &&
      board[currentId] === fun(currentId, 1 - i, board) &&
      board[currentId] === fun(currentId, 2 - i, board) &&
      board[currentId] === fun(currentId, 3 - i, board) &&
      board[currentId] === fun(currentId, 4 - i, board)
    ) {
      return true;
    }
  }
  return false;
}

function checkVerticalCell(currentId, distance, board) {
  const otherId = currentId + 15 * distance;
  const outOfBoard = otherId < 0 || otherId > 224;
  if (outOfBoard) {
    return null;
  } else {
    return board[otherId];
  }
}

function checkHorizontalCell(currentId, distance, board) {
  const otherId = currentId + distance;
  const row = Math.floor(currentId / 15);
  const otherRowid = Math.floor((otherId) / 15);
  if (row !== otherRowid) {
    return null;
  } else {
    return board[otherId];
  }
}

function checkDiagonalLeftCell(currentId, distance, board) {
  const otherId = currentId + 15 * distance - distance;
  const outOfBoard = otherId < 0 || otherId > 224;
  if (outOfBoard) {
    return null;
  } else {
    return board[otherId];
  }
}

function checkDiagonalRightCell(currentId, distance, board) {
  const otherId = currentId + 15 * distance + distance;
  const outOfBoard = otherId < 0 || otherId > 224;
  if (outOfBoard) {
    return null;
  } else {
    return board[otherId];
  }
}