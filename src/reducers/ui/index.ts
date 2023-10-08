import { combineReducers } from 'redux';

import books from './books';
import users from './users';

const uiReducers = combineReducers({ books, users });

export default uiReducers;
