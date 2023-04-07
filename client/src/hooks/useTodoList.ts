import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sortBy } from 'lodash';

import { IFormValue } from '../pages/components/AddForm';
import { SortEnum } from '../pages/components/Filter';
import { ITodo } from '../models/todo';
import TodoApi from '../services/todo-api';
import { useAppDispatch } from './redux';
import { todoSlice } from '../redux/reducers/todo';
import {
  addTodo,
  fetchTodoList,
  removeTodo,
  toggleTodo,
} from '../redux/actions/todo/fetch';

const useTodoList = (): IUseTodoListResponse => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(SortEnum.NONE);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, []);

  console.log('useTodoList hook');

  const filteredTodoList = useTodoListFilter({ search, todoList });

  const filteredAndSortedTodoList = useTodoListSort({
    sort,
    todoList: filteredTodoList,
  });

  const onRemove = (todo: ITodo) => {
    dispatch(removeTodo(todo));
  };

  const onEdit = (todo: ITodo) => {
    /* TODO */
  };

  const onToggleStatus = async (todo: ITodo) => {
    dispatch(toggleTodo(todo));
  };

  const onAdd = (dto: IFormValue) => {
    dispatch(addTodo(dto));
  };

  return {
    todoList: filteredAndSortedTodoList,
    onRemove,
    onAdd,
    onEdit,
    onToggleStatus,
    search,
    setSearch,
    setSort,
    sort,
    error,
    isLoading,
  };
};

const useTodoListFilter = ({
  search,
  todoList,
}: {
  todoList: ITodo[];
  search: string;
}): ITodo[] => {
  return useMemo(() => {
    console.log('useMemo useTodoListFilter');

    return todoList.filter(
      ({ description, title }) =>
        !search ||
        description.toLowerCase().includes(search.toLowerCase()) ||
        title.toLowerCase().includes(search.toLowerCase())
    );
  }, [todoList, search]);
};

const useTodoListSort = ({
  sort,
  todoList,
}: {
  todoList: ITodo[];
  sort: SortEnum;
}): ITodo[] => {
  return useMemo(() => {
    console.log('useMemo useTodoListSort');

    switch (sort) {
      case SortEnum.ASC:
        return sortBy(todoList, ({ title }) => title.toLowerCase());

      case SortEnum.DESC:
        return sortBy(todoList, ({ title }) => title.toLowerCase()).reverse();

      default:
        return todoList;
    }
  }, [todoList, sort]);
};

export default useTodoList;

interface IUseTodoListResponse {
  todoList: ITodo[];
  onRemove: (todo: ITodo) => void;
  onEdit: (todo: ITodo) => void;
  onAdd: (todo: IFormValue) => void;
  onToggleStatus: (todo: ITodo) => void;
  search: string;
  setSearch: (search: string) => void;
  sort: SortEnum;
  setSort: (search: SortEnum) => void;
  isLoading: boolean;
  error: string;
}
