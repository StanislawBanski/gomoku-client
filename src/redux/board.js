import { switchMove, checkStatus, incrementTurn, RESET_GAME, setWaiting } from './status';

const initialState = () => {
  const result = [];
  for (let i = 0; i < 225; i++) {
    result[i] = null;
  }
  return result;
};

const SET_CROSS = 'SET_CROSS';

export default function boardReducer(state = initialState(), action) {
  switch (action.type) {
    case SET_CROSS:
      const copy = [...state];
      copy[action.id] = action.value;
      return copy;
    case RESET_GAME:
      return initialState();
    default:
      return state;
  }
}

export function setCross(id, value) {
  return {
    type: SET_CROSS,
    id,
    value,
  };
}

export function makeFirstMove() {
  return (dispatch, getState) => {
    const state = getState();
    if (
      (state.status.move === false && state.settings[1].computer) ||
      (state.status.move === true && state.settings[2].computer)
    ) {
      dispatch(checkBotMove());
    }
  };
}

export function checkBotMove() {
  return (dispatch, getState) => {
    let settings;
    dispatch(setWaiting(true));
    let state = getState();
    if (state.status.move === false) {
      settings = state.settings[1];
    } else {
      settings = state.settings[2];
    }
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      cache: 'default',
      body: JSON.stringify({
        params: settings.params,
        board: state.board,
        move: state.status.move,
        filled: state.status.filled,
      }),
    };
    fetch(`http://${settings.address}`, options)
      .then(res => {
        res.json()
          .then(json => {
            state = getState();
            dispatch(setWaiting(false));
            dispatch(makeMove(json.move, state.status.move));
          })
      })
      .catch(err => console.log(err));
  };
}

export function makeMove(id, value) {
  return (dispatch, getState) => {
    let state = getState();
    if (
      state.status.move === value &&
      state.board[id] === null &&
      state.status.win === null &&
      !state.status.waiting &&
      state.status.in_progress
    ) {
      dispatch(setCross(id, value));
      state = getState();
      dispatch(switchMove());
      state = getState();
      if (getState().status.move === false) {
        dispatch(incrementTurn());
        state = getState();
      }
      dispatch(checkStatus(id, state.board));
      state = getState();
      if (
        (state.status.move === false && state.settings[1].computer) ||
        (state.status.move === true && state.settings[2].computer)
      ) {
        dispatch(checkBotMove());
      }
    }
  };
}
