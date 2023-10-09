import React from 'react';
import styles from './Operation.module.scss'
import {ISpend} from '../../utils/types'

interface IOperationProps {
    operation: ISpend
}

const Operation: React.FC<IOperationProps> = ({operation}) => {

    return (
        <div className={styles.operation}>
            <p className={styles.text}>{operation.sum}р</p>
            <p className={styles.text}>{operation.date}</p>
            <p className={styles.text}>{operation.operationName}</p>
            <p className={styles.text}>{operation.category}</p>
        </div>
    );
};

export default Operation;
