import TodoCard from './Card';
import styles from '../../styles/todo.module.css';
import AddTodoBtn from './AddBtn';
import useTodoList from '../../hooks/useTodoList';
import TodoFilter, { IProps as ITodoFilterProps } from './Filter';
import { memo } from 'react';
import { useAppSelector } from '../../hooks/redux';

function TodoList() {
  console.log('TodoList render');

  const {
    onAdd,
    onEdit,
    onRemove,
    onToggleStatus,
    search,
    setSearch,
    setSort,
    sort,
  } = useTodoList();

  const {
    error,
    isLoading,
    list: todoList,
  } = useAppSelector((state) => state.todo);

  const todoListFilterProps: ITodoFilterProps = {
    search,
    setSearch,
    setSort,
    sort,
  };

  return (
    <div className='w-100'>
      {error && <span>{error}</span>}

      <TodoFilter {...todoListFilterProps}></TodoFilter>

      {isLoading ? (
        'LOADING....'
      ) : (
        <>
          <div className={styles.list}>
            {todoList.map((todo) => (
              <div className={styles.listItem} key={todo.id}>
                <TodoCard
                  todo={todo}
                  onRemove={onRemove}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  key={todo.id}
                />
              </div>
            ))}
          </div>

          <AddTodoBtn onAdd={onAdd}></AddTodoBtn>
        </>
      )}
    </div>
  );
}

export default memo(TodoList);
