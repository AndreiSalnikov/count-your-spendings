import React from "react";
import styles from './Main.module.scss'
import Expenses from "../../components/Expenses/Expenses";
import Details from "../../components/Details/Details";
import Operations from "../../components/Operations/Operations";
const Main = () => {
    return (
        <main className={styles.main}>
            <Expenses/>
            <Details/>
            <Operations/>
        </main>
    );
};

export default Main;
