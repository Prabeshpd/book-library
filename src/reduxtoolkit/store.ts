import { configureStore } from '@reduxjs/toolkit';

import users from './reducers/User/users';

const reducers = {
  users,
};

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
