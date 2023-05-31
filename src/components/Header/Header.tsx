import React from 'react';
import styles from './Header.module.scss'
import { Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Привет, userName</h1>
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
