import { switchMove, checkStatus, incrementTurn, RESET_GAME } from "./status";

const initialState = () => {
  const result = [];
  for (let i = 0; i < 225; i++) {
    result[i] = null;
  }
  return result;
};

const SET_CROSS = "SET_CROSS";

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
    value
  };
}
export function makeMove(id, value) {
  return (dispatch, getState) => {
    if (
      getState().status.move === value &&
      getState().board[id] === null &&
      getState().status.win === null &&
      +getState().status.in_progress
    ) {
      dispatch(setCross(id, value));
      dispatch(switchMove());
      if (getState().status.move === true) {
        dispatch(incrementTurn());
      }
      dispatch(checkStatus(id, getState().board));
    }
  };
}
