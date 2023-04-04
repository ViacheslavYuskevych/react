import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdLibraryAdd } from 'react-icons/md';

import styles from '../../styles/todo.module.css';
import { IFormValue } from './AddForm';
import AddModal from './AddModal';

function AddTodoBtn({ onAdd }: IProps) {
  const [isModalShown, setModalShown] = useState(false);

  const show = () => {
    setModalShown(true);
  };

  const close = () => {
    setModalShown(false);
  };

  const handleAdd = (value: IFormValue) => {
    onAdd(value);
    close();
  };

  return (
    <>
      <button onClick={show} className={styles.addBtn}>
        <IconContext.Provider value={{ color: 'navy', size: '2.5em' }}>
          <MdLibraryAdd></MdLibraryAdd>
        </IconContext.Provider>
      </button>

      {isModalShown && <AddModal onAdd={handleAdd} onClose={close} />}
    </>
  );
}

export default AddTodoBtn;

interface IProps {
  readonly onAdd: (value: IFormValue) => void;
}
