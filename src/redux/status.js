const SWITCH_MOVE = "SWITCH_MOVE";
const CHECK_STATUS = "CHECK_STATUS";
const MAKE_TURN = "MAKE_TURN";

const initalState = {
  win: null,
  move: true,
  turn: 1,
  filled: 0,
  in_progress: false,
};

export default function statusReducer(state = initalState, action) {
  switch (action.type) {
    case SWITCH_MOVE:
      return Object.assign({}, state, {
        move: !state.move,
        filled: state.filled + 1,
      });
    case CHECK_STATUS:
      return checkGame(state, action.board, action.id);
    case MAKE_TURN:
      return Object.assign({}, state, { turn: state.turn + 1 });
    default:
      return state;
  }
}

export function switchMove() {
  return {
    type: SWITCH_MOVE,
  };
}

export function checkStatus(id, board) {
  return {
    type: CHECK_STATUS,
    id,
    board,
  };
}

export function incrementTurn() {
  return {
    type: MAKE_TURN,
  };
}

function checkGame(state, board, id) {
  if (
    checkLine(id, checkVerticalCell, board) &&
    checkLine(id, checkHorizontalCell, board) &&
    checkLine(id, checkDiagonalLeftCell, board) &&
    checkLine(id, checkDiagonalRightCell, board)
  ) {
    return Object.assign({}, state, { win: board[id] });
  }
  return state;
}

function checkLine(currentId, fun, board){
  for (let i = 0 ; i < 5; i ++){
    return (
    board[currentId] === fun(currentId, 0 - i, board) &&
    board[currentId] === fun(currentId, 1 - i, board) &&
    board[currentId] === fun(currentId, 2 - i, board) &&
    board[currentId] === fun(currentId, 3 - i, board) &&
    board[currentId] === fun(currentId, 4 - i, board) 
    )
  }
}

function checkVerticalCell(currentId, distance, board){
  var otherId = currentId + 15 * distance;
  var inBoard = otherId  < 0 || otherId > 224;
  if(!inBoard){
    return null;
  }
  else{
    return board[currentId + distance]
  }
}

function checkHorizontalCell(currentId, distance, board){
  var row = Math.floor(currentId/15);
  
  var otherRowid = Math.floor((currentId + distance)/15);
  if(row !== otherRowid){
    return null;
  }
  else{
    return board[currentId + distance]
  }
}

function checkDiagonalLeftCell(currentId, distance, board){
  var otherId = currentId + (15 * distance) - distance;
  var inBoard = otherId  < 0 || otherId > 224;
  if(!inBoard){
    return null;
  }
  else{
    return board[currentId + distance]
  }
}

function checkDiagonalRightCell(currentId, distance, board){
  var otherId = currentId + (15 * distance) + distance;
  var inBoard = otherId  < 0 || otherId > 224;
  if(!inBoard){
    return null;
  }
  else{
    return board[currentId + distance]
  }
}
