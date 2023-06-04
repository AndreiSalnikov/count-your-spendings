import React from 'react';
import styles from './Header.module.scss'
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {removeUser} from "../../store/slices/userSlice";

const Header = () => {
    const {name} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()

    const logout = async () => {
        try {
            localStorage.removeItem('firebase:authUser:AIzaSyCLB7j1mVRR7mkslNK6utAfuwhv_GvJ-RY:[DEFAULT]')
            dispatch(removeUser())
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Привет, {name}</h1>
                <button className={styles.header__button} onClick={logout}>Выйти</button>
                {/*<div className={styles.header__right}>*/}
                {/*    <span className={styles.header__burger}></span>*/}
                {/*    <span className={styles.header__burger}></span>*/}
                {/*    <span className={styles.header__burger}></span>*/}
                {/*</div>*/}
            </header>
            <Outlet/>
        </>
    );
};

export default Header;
