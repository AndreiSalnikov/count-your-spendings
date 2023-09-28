import React from 'react';
import styles from './Popup.module.scss'
import cn from 'classnames';
import {IPopupProps,IChildrenProps} from '../../utils/types'

const Popup: React.FC<IPopupProps<boolean> & IChildrenProps> = ({isPopupOpen, setIsPopupOpen,children}) => {
    return (
        <div
            className={cn(styles.popup,
                {
                    [styles.popup_opened]: isPopupOpen
                }
            )}>
            <div className={styles.container}>
                <button className={styles.close} onClick={() => {
                    setIsPopupOpen(!isPopupOpen)
                }
                }></button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
