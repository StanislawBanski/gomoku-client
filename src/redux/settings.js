const initialState = {
  1: {
    computer: false,
    selectedAI: 0,
    depth: 0,
    turnTime: 0,
    algorithm: 0
  },
  2: {
    computer: false,
    selectedAI: 0,
    depth: 0,
    turnTime: 0,
    algorithm: 0
  }
};

const SET_COMPUTER = "SET_COMPUTER";
const SWITCH_PLAYERS = "SWITCH_PLAYERS";
const SET_AI = "SET_AI";
const SET_DEPTH = "SET_DEPTH";
const SET_ALGORITHM = "SET_ALGORITHM";
const SET_TIME = "SET_TIME";
const SWITCH_PREVIEW = "SWITCH_PREVIEW";

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPUTER:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[action.player],
          computer: action.value
        }
      });
    case SWITCH_PLAYERS:
      return Object.assign({}, state, {
        1: state[2],
        2: state[1]
      });
    case SET_AI:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[action.player],
          selectedAI: action.value
        }
      });
    case SET_DEPTH:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[action.player],
          depth: action.value
        }
      });
    case SET_ALGORITHM:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[action.player],
          algorithm: action.value
        }
      });
    case SET_TIME:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[action.player],
          turnTime: action.value
        }
      });
    case SWITCH_PREVIEW:
      return Object.assign({}, state, {
        preview: action.value
      });
    default:
      return state;
  }
}

export function setAlgorithm(player, value) {
  return {
    type: SET_ALGORITHM,
    player,
    value
  };
}

export function switchPreview(value) {
  return {
    type: SWITCH_PREVIEW,
    value
  };
}

export function setTurnTime(player, value) {
  return {
    type: SET_TIME,
    player,
    value
  };
}

export function setAI(player, value) {
  return {
    type: SET_AI,
    player,
    value
  };
}

export function setDepth(player, value) {
  return {
    type: SET_DEPTH,
    player,
    value
  };
}

export function setComputer(player, value) {
  return {
    type: SET_COMPUTER,
    player,
    value
  };
}

export function switchPlayers() {
  return {
    type: SWITCH_PLAYERS
  };
}
