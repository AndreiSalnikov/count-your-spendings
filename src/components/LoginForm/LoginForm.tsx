import React, {FC, useState} from 'react';
import styles from './LoginForm.module.scss'
import {Link} from "react-router-dom";
import {getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {useNavigate} from 'react-router-dom';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, pass);
            await setPersistence(auth, browserLocalPersistence);
            dispatch(
                setUser({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                })
            );
            nav('/');
        } catch (error) {
            alert('Неверный логин или пароль!');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <input className={styles.input}
                   required
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="email"
            />
            <input className={styles.input}
                   required
                   type="password"
                   value={pass}
                   onChange={(e) => setPass(e.target.value)}
                   placeholder="password"
            />
            <button type="submit">
                Войти
            </button>
            <p>Нет аккаунта?<Link className={styles.link} to={'/signup'}> Зарегистрироваться</Link></p>

        </form>
    );
}

export default LoginForm;
