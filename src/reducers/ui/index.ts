import { combineReducers } from 'redux';

import books from './books';
import users from './users';
import userBooks from './userBooks';

const uiReducers = combineReducers({ books, users, userBooks });

export default uiReducers;
