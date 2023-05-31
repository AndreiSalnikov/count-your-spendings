import React from 'react';
import cn from 'classnames';
import styles from './Arrow.module.scss';

interface IArrowProps {
  isArrowLeft: boolean;
}

const Arrow: React.FC<IArrowProps> = ({ isArrowLeft }) => {
  const arrowClassNames = cn(styles.arrow, {
    [styles.arrow__reverse]: isArrowLeft,
  });

  return <button className={arrowClassNames}></button>;
};

export default Arrow;
