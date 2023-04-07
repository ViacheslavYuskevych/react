import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITodo } from '../../models/todo';

export interface ITodoState {
  list: ITodo[];
  isLoading: boolean;
  error: string;
}

const initialState: ITodoState = {
  error: '',
  isLoading: false,
  list: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    multiAdd(state, { payload: list }: PayloadAction<ITodo[]>) {
      state.list = list;
      state.isLoading = false;
      state.error = '';
    },
    add(state, { payload: todo }: PayloadAction<ITodo>) {
      state.list.push(todo);
      state.isLoading = false;
      state.error = '';
    },
    update(state, { payload: todo }: PayloadAction<ITodo>) {
      state.list = state.list.map((t) => (t.id === todo.id ? todo : t));
      state.isLoading = false;
      state.error = '';
    },
    remove(state, { payload: { id } }: PayloadAction<ITodo>) {
      state.list = state.list.filter((todo) => id !== todo.id);
      state.isLoading = false;
      state.error = '';
    },
    startLoading(state) {
      state.isLoading = true;
    },
    catchError(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export default todoSlice.reducer;
