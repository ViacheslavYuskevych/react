import { useMemo } from 'react';

import styles from '../../styles/shared/button.module.css';

function Button({
  children: content,
  isDisabled,
  onClick,
  classNames: customClassNames,
}: IProps) {
  const classNames = useMemo(() => {
    const classNames: string[] = [styles.btn];

    if (customClassNames?.length) classNames.push(...customClassNames);

    return classNames;
  }, [customClassNames]);

  return (
    <button
      className={classNames.join(' ')}
      onClick={onClick}
      disabled={!!isDisabled}
    >
      {content}
    </button>
  );
}

export default Button;

interface IProps {
  children: JSX.Element | string;
  isDisabled?: boolean;
  onClick: () => void;
  classNames?: string[];
}
