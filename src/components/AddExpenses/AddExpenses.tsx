import React, {useState} from 'react';
import styles from './AddExpenses.module.scss'
import PopupSubtraction from "../PopupSubstraction/PopupSubtraction";

const AddExpenses = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    return (
        <>
            <PopupSubtraction isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
            <div className={styles.add}>
                <div className={styles.add__circle} onClick={()=>setIsPopupOpen(true)}></div>
                <div className={styles.add__circle} onClick={()=>window.alert("Добавление доходов находится в разработке")}></div>
            </div>
        </>
)

};

export default AddExpenses;
