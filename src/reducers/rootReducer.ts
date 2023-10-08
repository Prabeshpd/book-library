import { combineReducers } from 'redux';

import data from './data';
import ui from './ui';

const rootReducer = combineReducers({
  data,
  ui,
});

export default (state: any, action: any) => {
  const value = rootReducer(state, action);

  if (action.type === 'LOGOUT_FULFILLED') {
    localStorage.removeItem('persist:root');
    return rootReducer(undefined, action);
  }

  return value;
};
