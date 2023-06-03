import React, {ReactNode} from 'react';
import styles from './Popup.module.scss'
import cn from 'classnames';

interface IPopupProps {
    isPopupOpen: boolean,
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode;

}

const Popup: React.FC<IPopupProps> = ({isPopupOpen, setIsPopupOpen, children}) => {
    return (
        <div
            className={cn(styles.popup,
                {
                    [styles.popup_opened]: isPopupOpen
                }
            )}>
            <div className={styles.popup__container}>
                <button className={styles.popup__close} onClick={() => {
                    setIsPopupOpen(!isPopupOpen)
                }
                }></button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
