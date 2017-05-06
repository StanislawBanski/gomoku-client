import { switchMove, checkStatus, incrementTurn, RESET_GAME } from "./status";

const initialState = () => {
  const result = [];
  for (let i = 0; i < 225; i++) {
    result[i] = null;
  }
  return result;
  // var bord = [
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   true,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   true,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   null,
  //   null,
  //   null,
  //   true,
  //   false,
  //   true,
  //   true,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false
  // ];
  // return bord;
  
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

export function makeFirstStep() {
  return (dispatch, getState) => {
    const state = getState();
    if((state.status.move === false && state.settings[1].computer) || 
      (state.status.move === true && state.settings[2].computer)){
        dispatch(checkAIMove());
      } 
  }
}

export function checkAIMove(){
  return (dispatch, getState) => {
    const address= "localhost:4567/"
    let settings;
    let state = getState();
    if(state.status.move === false){
      settings = state.settings[1];
    }
    else {
      settings = state.settings[2];
    }
    const params = {
      algorithm: settings.algorithm,
      selectedHeuristic: settings.selectedAI,
      turnTime: settings.turnTime,
      depth: settings.depth
    }
    const options = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        cache: "default",
        body: JSON.stringify({
          params: params,
          board: state.board,
          move: state.status.move,
          filled: state.status.filled
        }),
      };
    fetch(`http://${address}`,options).
    then( res => {
      res.json().then(json => {
        state = getState();
        dispatch(makeMove(json.move, state.status.move));
      })
    }
    ).catch(err => console.log(err))
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
    let state = getState();
    if (
      state.status.move === value &&
      state.board[id] === null &&
      state.status.win === null &&
      state.status.in_progress
    ) {
      dispatch(setCross(id, value));
      state = getState();
      dispatch(switchMove());
      state = getState();
      if (state.status.move === false) {
        dispatch(incrementTurn());
        state = getState();
      }
      dispatch(checkStatus(id, state.board));
      state = getState();
      if((state.status.move === false && state.settings[1].computer) || 
      (state.status.move === true && state.settings[2].computer)){
        dispatch(checkAIMove());
      }      
    }
  };
}
