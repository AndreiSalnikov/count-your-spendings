import React, {useEffect} from "react";
import styles from './Main.module.scss'
import Expenses from "../../components/Expenses/Expenses";
import Operations from "../../components/Operations/Operations";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getIncome, getSpend} from "../../utils/firebase";
import {addSpend} from "../../store/slices/spendSlice";
import {addIncomeStore} from "../../store/slices/incomeSlice";

import {setLoading} from "../../store/slices/loadingSlice";

const Main = () => {
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    //вынести отдельно, или подумать как упроситить
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonthName = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataSpend = await getSpend(id, currentYear, currentMonthName);
                const dataIncome = await getIncome(id, currentYear, currentMonthName)

                Object.entries(dataIncome).forEach(([incomeId, incomeData]) => {
                    dispatch(addIncomeStore({incomeId, incomeData}));
                })

                Object.entries(dataSpend).forEach(([spendId, spendData]) => {
                    dispatch(addSpend({spendId, spendData}));
                })
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className={styles.main}>
            <Expenses/>
            <Operations/>
            <AddExpenses/>
        </main>
    );
};

export default Main;
