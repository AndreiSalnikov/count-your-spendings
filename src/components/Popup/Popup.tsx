import React, {ReactNode} from 'react';
import styles from './Popup.module.scss'
interface IPopupProps {
    isPopupOpen: boolean,
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode;

}

const Popup: React.FC<IPopupProps> = ({isPopupOpen, setIsPopupOpen, children}) => {
    return (
        <div
            className={isPopupOpen ? `${styles.popup} ${styles.popup_opened}` : `${styles.popup}`}>
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
