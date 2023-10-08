import { combineReducers } from 'redux';

import users from './users';
import books from './books';

const dataReducers = combineReducers({ users, books });

export default dataReducers;
