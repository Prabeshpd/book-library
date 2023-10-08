import { combineReducers } from 'redux';

import books from './books';

const uiReducers = combineReducers({ books });

export default uiReducers;
