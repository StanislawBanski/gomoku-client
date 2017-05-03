const initialState = {
  1: {
    computer: false,
    address: "",
    params: "",
  },
  2: {
    computer: false,
    address: "",
    params: "",
  },
};

const SET_COMPUTER = "SET_COMPUTER";
const SET_ADDRESS = "SET_ADDRESS";
const SET_PARAMS = "SET_PARAMS";
const SWITCH_PLAYERS = "SWITCH_PLAYERS";

export default function settingsReducer(state = initialState, action) {
  return state;
  switch (action.type) {
    case SET_COMPUTER:
      return Object.assign({}, state, {
        [action.player]: {
          computer: action.value,
        },
      });
    case SET_ADDRESS:
      return Object.assign({}, state, {
        [action.player]: {
          address: action.address,
        },
      });
    case SET_PARAMS:
      return Object.assign({}, state, {
        [action.player]: {
          params: action.params,
        },
      });
    case SWITCH_PLAYERS:
      return Object.assign({}, state, {
        1: state[2],
        2: state[1],
      });
    default:
      return state;
  }
}

export function setComputer(player, value) {
  return {
    type: SET_COMPUTER,
    player,
    value,
  };
}

export function setAddress(player, address) {
  return {
    type: SET_ADDRESS,
    player,
    address,
  };
}

export function setParams(player, params) {
  return {
    type: SET_PARAMS,
    player,
    params,
  };
}

export function switchPlayers() {
  return {
    type: SWITCH_PLAYERS,
  };
}
