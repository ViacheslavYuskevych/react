import { ITodo } from '../../../models/todo';
import { IFormValue } from '../../../pages/components/AddForm';
import TodoApi from '../../../services/todo-api';
import { todoSlice } from '../../reducers/todo';
import { IAppDispatch } from '../../store';

export const fetchTodoList = () => async (dispatch: IAppDispatch) => {
  dispatch(todoSlice.actions.startLoading());

  try {
    const { data: todoList } = await TodoApi.get();

    dispatch(todoSlice.actions.multiAdd(todoList));
  } catch (error: any) {
    dispatch(todoSlice.actions.catchError(error?.message));
  }
};

export const addTodo = (dto: IFormValue) => async (dispatch: IAppDispatch) => {
  dispatch(todoSlice.actions.startLoading());

  try {
    const { data: todo } = await TodoApi.add(dto);

    dispatch(todoSlice.actions.add(todo));
  } catch (error: any) {
    dispatch(todoSlice.actions.catchError(error?.message));
  }
};

export const removeTodo = (todo: ITodo) => async (dispatch: IAppDispatch) => {
  dispatch(todoSlice.actions.startLoading());

  try {
    await TodoApi.remove(todo.id);

    dispatch(todoSlice.actions.remove(todo));
  } catch (error: any) {
    dispatch(todoSlice.actions.catchError(error?.message));
  }
};

export const toggleTodo = (todo: ITodo) => async (dispatch: IAppDispatch) => {
  dispatch(todoSlice.actions.startLoading());

  const toggledTodo: ITodo = { ...todo, isDone: !todo.isDone };

  try {
    await TodoApi.update(todo.id, toggledTodo);

    dispatch(todoSlice.actions.update(toggledTodo));
  } catch (error: any) {
    dispatch(todoSlice.actions.catchError(error?.message));
  }
};
