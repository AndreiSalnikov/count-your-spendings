import React from "react";
import styles from './Main.module.scss'
import Expenses from "../../components/Expenses/Expenses";
import Operations from "../../components/Operations/Operations";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import Popup from "../../components/Popup/Popup";

const Main = () => {

    return (
        <main className={styles.main}>
            <div></div>
            <Expenses/>
            {/*  <Details/>*/}
            <Operations/>
            <AddExpenses/>
        </main>
    );
};

export default Main;
