import React, {useEffect} from "react";
import styles from './Main.module.scss'
import Expenses from "../../components/Expenses/Expenses";
import Operations from "../../components/Operations/Operations";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getSpend} from "../../utils/firebase";
import {addSpend} from "../../store/slices/spendSlice";
import {setLoading} from "../../store/slices/loadingSlice";

const Main = () => {
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSpend(id);
                Object.entries(data).forEach(([spendId, spendData]) => {
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
