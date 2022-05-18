import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import type { AppState } from './store';

export interface ThemeState {
  list: Todo[];
}

const initialState: ThemeState = {
  list: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Todo[]>) => {
      state.list = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.list = [...state.list, action.payload];
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list = [
        ...state.list.slice(0, index),
        action.payload,
        ...state.list.slice(index + 1),
      ];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setList, addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export const selectTodoList = (state: AppState) => state.todo.list;

export default todosSlice.reducer;
