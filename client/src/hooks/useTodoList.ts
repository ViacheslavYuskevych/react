import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sortBy } from 'lodash';

import { IFormValue } from '../pages/components/AddForm';
import { SortEnum } from '../pages/components/Filter';
import { ITodo } from '../models/todo';
import TodoApi from '../services/todo-api';

const useTodoList = (): IUseTodoListResponse => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(SortEnum.NONE);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useFetchTodoList({ setError, setLoading, setTodoList });

  console.log('useTodoList hook');

  const filteredTodoList = useTodoListFilter({ search, todoList });

  const filteredAndSortedTodoList = useTodoListSort({
    sort,
    todoList: filteredTodoList,
  });

  const onRemove = async ({ id }: ITodo) => {
    setLoading(true);

    try {
      await TodoApi.remove(id);

      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (todo: ITodo) => {
    /* TODO */
  };

  const onToggleStatus = async ({ id, isDone }: ITodo) => {
    setLoading(true);

    try {
      await TodoApi.update(id, { isDone });

      setTodoList(
        todoList.map((todo) =>
          todo.id === id ? { ...todo, isDone: !isDone } : todo
        )
      );
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async (dto: IFormValue) => {
    setLoading(true);

    try {
      const { data: todo } = await TodoApi.add(dto);

      setTodoList([...todoList, todo]);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
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

const useFetchTodoList = ({
  setLoading,
  setError,
  setTodoList,
}: {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setTodoList: (todoList: ITodo[]) => void;
}) => {
  const fetch = async () => {
    console.log('useFetchTodoList ');

    try {
      const { data: todoList } = await TodoApi.get();

      setTodoList(todoList);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch();
  }, []);
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

const MOCK_TODO_LIST: ITodo[] = [
  {
    id: uuidv4(),
    title: 'Move to Thailand',
    description: 'Move with all family to Thailand and spend there fun time.',
    isDone: true,
  },
  {
    id: uuidv4(),
    title: 'Find new project',
    description: 'Find new project or company to raise job compensation.',
    isDone: false,
  },
  {
    id: uuidv4(),
    title:
      'Item to deleteItem to delete Item to delete Item to delete Item to delete',
    description: 'Find new project or company to raise job compensation.',
    isDone: false,
  },
];
