import { combineReducers } from 'redux';

import data from './data';

const rootReducer = combineReducers({
  data,
});

export default (state: any, action: any) => {
  const value = rootReducer(state, action);

  return value;
};
