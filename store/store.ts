import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';

export function makeStore() {
  return configureStore({
    reducer: { todo: todoReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
