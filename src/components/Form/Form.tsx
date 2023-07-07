import React, {FC, useState} from 'react';
import styles from './Form.module.scss'

interface IFormProps {
    title: string;
    handleClick: (e: React.FormEvent,email: string, pass: string) => void;

}

const Form: FC<IFormProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className={styles.form}>
            <input className={styles.form__input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input className={styles.form__input}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <button onClick={(e) => handleClick(e,email, pass)}>
                {title}
            </button>
        </div>
    );
}

export default Form;