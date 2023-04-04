import { SyntheticEvent, useMemo, useRef } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineClose } from 'react-icons/md';

import styles from '../../styles/shared/modal.module.css';

function Modal({
  children: [body, buttons],
  title,
  onClose,
  modalClassNames: customModalClassNames,
}: IProps) {
  const modalElement = useRef<HTMLDivElement>(null);

  const modalClassNames = useMemo(() => {
    const classNames: string[] = [styles.modal];

    if (customModalClassNames?.length)
      classNames.push(...customModalClassNames);

    return classNames;
  }, [customModalClassNames]);

  const onBackdropClick = (e: SyntheticEvent) => {
    const modalRef = modalElement.current as HTMLDivElement;
    const targetRef = e.target as HTMLDivElement;

    if (!modalRef.contains(targetRef)) onClose();
  };

  return (
    <>
      <div className={styles.backdrop}></div>

      <div className={styles.container} onClick={(e) => onBackdropClick(e)}>
        <div className={modalClassNames.join(' ')} ref={modalElement}>
          <div className={styles.header}>
            <h4 className={styles.headerTitle}>{title}</h4>

            <div onClick={onClose} className={styles.headerCloseBtn}>
              <IconContext.Provider value={{ color: 'beige', size: '1.5em' }}>
                <MdOutlineClose></MdOutlineClose>
              </IconContext.Provider>
            </div>
          </div>

          <div className={styles.body}>{body}</div>

          {buttons && <div className={styles.footer}>{buttons}</div>}
        </div>
      </div>
    </>
  );
}

export default Modal;

interface IProps {
  children: JSX.Element[];
  title: string;
  onClose: () => void;
  modalClassNames?: string[];
}
