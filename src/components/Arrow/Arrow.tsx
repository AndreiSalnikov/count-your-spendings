import React from 'react';
import cn from 'classnames';
import styles from './Arrow.module.scss';

export enum ArrowDirection {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom',
}
interface IArrowProps {
  direction: ArrowDirection;
}

const Arrow: React.FC<IArrowProps> = ({ direction }) => {
const arrowClassNames = cn(styles.arrow, styles[direction.toLowerCase()]);

  return <button className={arrowClassNames}></button>;
};

export default Arrow;
