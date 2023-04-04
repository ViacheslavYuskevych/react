import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { isNil } from 'lodash';

import styles from '../../styles/todo.module.css';

function AddForm({ setValue, value }: IProps) {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const onChange = ({ target }: SyntheticEvent, key: keyof IFormValue) => {
    const { value: inputValue, checked, type } = target as HTMLInputElement;

    if (isNil(inputValue) || inputValue === '') return;

    setValue({ ...value, [key]: type === 'checkbox' ? checked : inputValue });
  };

  return (
    <form onSubmit={onSubmit} className={styles.addForm}>
      <div className={styles.addFormControl}>
        <label htmlFor='add-form-title' className={styles.addFormControlLabel}>
          <span className={styles.addFormControlLabelSpan}>Title</span>
        </label>

        <input
          className='w-100'
          name='add-form-title'
          type='text'
          onChange={(e) => onChange(e, 'title')}
          value={value.title}
        />
      </div>

      <div className={styles.addFormControl}>
        <label
          htmlFor='add-form-description'
          className={styles.addFormControlLabel}
        >
          <span className={styles.addFormControlLabelSpan}>Description</span>
        </label>

        <textarea
          className='w-100'
          name='add-form-description'
          onChange={(e) => onChange(e, 'description')}
          value={value.description}
        />
      </div>

      <div className={styles.addFormControl}>
        <label
          htmlFor='add-form-is-done'
          className={styles.addFormControlLabel}
        >
          <span className={styles.addFormControlLabelSpan}>Status</span>
        </label>

        <input
          name='add-form-is-done'
          type='checkbox'
          onChange={(e) => onChange(e, 'isDone')}
          checked={value.isDone}
        />
      </div>
    </form>
  );
}

export default AddForm;

interface IProps {
  readonly value: IFormValue;
  readonly setValue: Dispatch<SetStateAction<IFormValue>>;
}

export interface IFormValue {
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}
