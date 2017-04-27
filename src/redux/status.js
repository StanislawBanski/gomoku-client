const SWITCH_MOVE = 'SWITCH_MOVE';
const CHECK_STATUS = 'CHECK_STATUS';
const MAKE_TURN = 'MAKE_TURN';

const initalState = {
    win: null,
    move: true,
    turn: 1,
}

export default function statusReducer(state = initalState, action) {
    switch (action.type) {
        case SWITCH_MOVE:
            return Object.assign({}, state, {move: !state.move})
        case CHECK_STATUS:
            return checkGame(state, action.board, action.id);
        case MAKE_TURN:
            return Object.assign({}, state, {turn: state.turn + 1});
        default:
            return state;
    }
}

export function switchMove() {
    return {
        type: SWITCH_MOVE
    }
}

export function checkStatus(id, board) {
    return {
        type: CHECK_STATUS,
        id,
        board
    }
}

export function incrementTurn() {
    return {
        type: MAKE_TURN
    }
}

function checkGame(state, board, id) {
    if (board[id] === board[id-1]
      && board[id] === board[id-2]
      && board[id] === board[id-3]
      && board[id] === board[id-4]) {
        return Object.assign({}, state, { win: board[id] })
    }
    return state;
}
