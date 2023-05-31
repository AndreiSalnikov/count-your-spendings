import React from 'react';
import { Outlet } from "react-router-dom";
import styles from './Footer.module.scss'
const Footer = () => {
    return (
        <>
            <Outlet/>
            <footer className={styles.footer}>
                <p>Powered by Andrey Salnikov</p>
            </footer>

        </>
    );
};

export default Footer;
