import React, {useState} from 'react';
import styles from './AddExpenses.module.scss'
import PopupSubtraction from "../PopupSubstraction/PopupSubtraction";
import PopupIncome from "../PopupIncome/PopupIncome";
const AddExpenses = () => {
    const [isPopupSubtractionOpen, setIsPopupSubtractionOpen] = useState(false)
    const [isPopupIncomeOpen, setIsPopupIncomeOpen] = useState(false)

    return (
        <>
            <PopupIncome isPopupOpen={isPopupIncomeOpen} setIsPopupOpen={setIsPopupIncomeOpen}/>
            <PopupSubtraction isPopupOpen={isPopupSubtractionOpen} setIsPopupOpen={setIsPopupSubtractionOpen} />
            <div className={styles.add}>
                <div className={styles.add__circle} onClick={()=>setIsPopupSubtractionOpen(true)}></div>
                <div className={styles.add__circle} onClick={()=>setIsPopupIncomeOpen(true)}></div>
            </div>
        </>
)

};

export default AddExpenses;
