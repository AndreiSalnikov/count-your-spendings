import React, {useState} from 'react';
import styles from './RegisterForm.module.scss'
import {setUser} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {Link, useNavigate} from 'react-router-dom';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    updateProfile
} from "firebase/auth";

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const handleRegister = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();
        const auth = getAuth();

        try {

            const {user} = await createUserWithEmailAndPassword(auth, email, pass);
            await setPersistence(auth, browserLocalPersistence);
            await updateProfile(user, {
                displayName: name,
            });

            dispatch(
                setUser({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                    // token: user.refreshToken,
                })
            );

            nav('/');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleRegister}>
            <input className={styles.input}
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="name"
            />
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
                Зарегистрироваться
            </button>
            <p>Уже есть аккаунт?<Link className={styles.link} to={'/signin'}> Войти</Link></p>

        </form>
    );
};

export default RegisterForm;
