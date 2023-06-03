import React, {useState} from 'react';
import styles from './Register.module.scss'
import {Link, useNavigate} from 'react-router-dom';
import {
    getAuth,
    browserLocalPersistence,
    setPersistence,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import Form from '../../components/Form/Form';
import {setUser} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../hooks/redux-hooks';

const Register = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [name, setName] = useState('');
    const handleRegister = async (
        e: React.FormEvent,
        email: string,
        password: string
    ) => {
        e.preventDefault();
        const auth = getAuth();

        try {

            const {user} = await createUserWithEmailAndPassword(auth, email, password);
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
        <>
            <form className={styles.register}>
                <input className={styles.register__input}
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="name"
                />
                <Form
                    title="Регистрация"
                    handleClick={handleRegister}
                />
                <p>Уже есть аккаунт?<Link className={styles.register__link} to={'/signin'}> Войти</Link></p>
            </form>

        </>
    )
}

export default Register;
