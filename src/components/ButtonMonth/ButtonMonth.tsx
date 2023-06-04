import React from 'react';
import styles from './ButtonMonth.module.scss'
interface IButtonProps {
    text: string
}

const ButtonMonth: React.FC<IButtonProps> = ({text}) => {
    return (
        <>
            <button className={styles.button}>
                {text}
            </button>
        </>
    );
};

export default ButtonMonth;
