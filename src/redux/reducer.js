import { combineReducers } from 'redux';
import board from './board';
import status from './status';
import settings from './settings';

export default combineReducers({
  board,
  status,
  settings
})
