import React from 'react'
import styles from './Preloader.module.scss'
import cn from 'classnames'
interface IPreloaderProps {
    className: string
}

const Preloader: React.FC<IPreloaderProps> = ({className}) => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span className={cn( styles.preloader__round, className)}></span>
      </div>
    </div>
  )
};

export default Preloader
