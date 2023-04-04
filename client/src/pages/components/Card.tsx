import { IconContext } from 'react-icons';
import { MdAccessTime, MdDoneOutline } from 'react-icons/md';

import { ITodo } from '../../models/todo';
import Button from '../../shared/components/Btn';
import styles from '../../styles/todo.module.css';

function TodoCard({ todo, onEdit, onRemove, onToggleStatus }: IProps) {
  const { description, isDone, title } = todo;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerTitle} title={title}>
          {title}
        </span>

        <div>
          {isDone ? (
            <IconContext.Provider value={{ color: 'green', size: '1.5em' }}>
              <MdDoneOutline></MdDoneOutline>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: 'red', size: '1.5em' }}>
              <MdAccessTime></MdAccessTime>
            </IconContext.Provider>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.bodyText}>{description}</p>
      </div>

      <div className={styles.footer}>
        <Button onClick={() => onEdit(todo)} classNames={['mr-1']}>
          Edit
        </Button>

        <Button onClick={() => onRemove(todo)} classNames={['mr-1']}>
          Remove
        </Button>

        <Button onClick={() => onToggleStatus(todo)} classNames={['mr-1']}>
          Toggle status
        </Button>
      </div>
    </div>
  );
}

interface IProps {
  todo: ITodo;
  onRemove: (todo: ITodo) => void;
  onToggleStatus: (todo: ITodo) => void;
  onEdit: (todo: ITodo) => void;
}

export default TodoCard;
