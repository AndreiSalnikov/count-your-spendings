import React from 'react';
import styles from './Header.module.scss'
import { Outlet } from "react-router-dom";
import {useAppSelector} from "../../hooks/redux-hooks";

const Header = () => {
    const {name} = useAppSelector(state => state.user);
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Привет, {name}</h1>
                <div className={styles.header__right}>
                    <span className={styles.header__burger}></span>
                    <span className={styles.header__burger}></span>
                    <span className={styles.header__burger}></span>
                </div>
            </header>
            <Outlet/>
        </>
    );
};

export default Header;
