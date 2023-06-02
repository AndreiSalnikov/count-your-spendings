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
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <Form
                    title="Регистрация"
                    handleClick={handleRegister}
                />
            </form>
            <p>Уже есть аккаунт?<Link to={'/signin'}>Войти</Link></p>
        </>
    )
}

export default Register;
