import React from 'react';
import styles from './Login.module.scss'
import {Link, useNavigate} from 'react-router-dom';

import {getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword} from "firebase/auth";
import Form from '../../components/Form/Form';
import {setUser} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../hooks/redux-hooks';

const Login = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const handleLogin = async (e: React.FormEvent, email: string, password: string) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
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
            alert('Invalid user!');
        }
    };

    return (
        <form className={styles.login}>
            <Form
                title="Войти"
                handleClick={handleLogin}
            />
            <p>Нет аккаунта?<Link className={styles.login__link} to={'/signup'}> Зарегистрироваться</Link></p>
        </form>
    )
}

export default Login;
