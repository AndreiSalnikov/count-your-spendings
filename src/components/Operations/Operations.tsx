import React from 'react';
import styles from './Operations.module.scss'
import firebase from "firebase/compat";
import Operation from "../Operation/Operation";


const Operations = () => {
    const date = new Date();
    const testData = [
        {sum: 100, operationName: 'Пиво', date: date, category: 'Продукты',id:1},
        {sum: 100, operationName: 'Пиво', date: date, category: 'Продукты',id:2},
        {sum: 100, operationName: 'Пиво', date: date, category: 'Продукты',id:3}
    ]

    return (
            <div className={styles.operations}>
                {testData.map((obj) => (
                    <Operation key={obj.id} operation={obj}/>
                ))}
            </div>
    );
};

export default Operations;
