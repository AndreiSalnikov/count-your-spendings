import React from 'react'
import styles from './Preloader.module.scss'
import cn from 'classnames'
import {IPreloaderProps} from '../../utils/types'

const Preloader: React.FC<IPreloaderProps> = ({className}) => {
  return (
    <div className={styles.preloader}>
      <div className={styles.container}>
        <span className={cn( styles.round, className)}></span>
      </div>
    </div>
  )
};

export default Preloader
