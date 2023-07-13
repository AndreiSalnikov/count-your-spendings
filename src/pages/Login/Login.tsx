import React, {useState} from 'react';
import styles from './Login.module.scss';
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {setUser} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {useNavigate} from 'react-router-dom';

interface IFormProps {
    isRegister: boolean;
    onToggleForm: (state: boolean) => void;
}

const FormStructor = () => {
    const [isRegisterForm, setIsRegisterForm] = useState(true);

    return (
        <div className={styles.theme}>
            <div className={styles.formStructor}>
                <Login onToggleForm={setIsRegisterForm} isRegister={isRegisterForm}/>
                <Signup onToggleForm={setIsRegisterForm} isRegister={isRegisterForm}/>
            </div>
        </div>
    );
};

const Signup: React.FC<IFormProps> = ({onToggleForm, isRegister}) => {
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
        <form className={isRegister ? styles.signup : `${styles.signup} ${styles.slideUp}`} onSubmit={handleRegister}>
            <div className={styles.formTitle} onClick={() => onToggleForm(!isRegister)}>
                Зарегистрируйтесь!
            </div>
            <div className={isRegister ? styles.formHolder : `${styles.formHolder} ${styles.off}`}>
                <input className={styles.input}
                       required
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Имя"/>
                <input className={styles.input}
                       required
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Электронная почта"/>
                <input className={styles.input}
                       required
                       type="password"
                       value={pass}
                       onChange={(e) => setPass(e.target.value)}
                       placeholder="Пароль"/>
            </div>
            <button type="submit" className={styles.submitBtn}>Зарегистрироваться</button>
        </form>
    );
};

const Login: React.FC<IFormProps> = ({onToggleForm, isRegister}) => {

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
        <form className={isRegister ? `${styles.login} ${styles.slideUp}` : styles.login} onSubmit={handleLogin}>
            <div className={styles.center}>
                <h2 className={styles.formTitle} id="login" onClick={() => onToggleForm(!isRegister)}>
                    {isRegister && <span>Уже есть аккаунт?</span>}
                    Войти
                </h2>
                <div className={styles.formHolder}>
                    <input className={styles.input}
                           required
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Электронная почта"

                    />
                    <input className={styles.input}
                           required
                           type="password"
                           value={pass}
                           onChange={(e) => setPass(e.target.value)}
                           placeholder="Пароль"/>
                </div>
                <button className={styles.submitBtn} type="submit">Войти</button>
            </div>
        </form>
    );
};

export default FormStructor;
