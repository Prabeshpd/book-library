import { combineReducers } from 'redux';

import users from './users';
import books from './books';
import userBooks from './userBooks';

const dataReducers = combineReducers({ users, books, userBooks });

export default dataReducers;
