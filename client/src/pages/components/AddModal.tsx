import { useEffect, useState } from 'react';

import Modal from '../../shared/components/Modal';
import Button from '../../shared/components/Btn';
import styles from '../../styles/shared/modal.module.css';
import AddForm, { IFormValue } from './AddForm';

function AddModal({ onAdd, onClose }: IProps) {
  const [value, setValue] = useState<IFormValue>(DEFAULT_VALUE);

  const validate = (value: IFormValue): boolean => {
    const { description, title } = value;

    return !!title && !!description;
  };

  const handleAdd = (value: IFormValue) => {
    onAdd(value);

    setValue(DEFAULT_VALUE);
  };

  useEffect(() => {
    setValid(validate(value));
  }, [value]);

  const [isValid, setValid] = useState(validate(value));

  return (
    <Modal
      title='Add todo'
      onClose={onClose}
      modalClassNames={[styles.formModal]}
    >
      <AddForm value={value} setValue={setValue}></AddForm>

      <>
        <Button
          onClick={() => handleAdd(value)}
          classNames={['mr-2']}
          isDisabled={!isValid}
        >
          Add
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </>
    </Modal>
  );
}

export default AddModal;

interface IProps {
  readonly onAdd: (value: IFormValue) => void;
  readonly onClose: () => void;
}

const DEFAULT_VALUE: IFormValue = {
  description: '',
  isDone: false,
  title: '',
};
