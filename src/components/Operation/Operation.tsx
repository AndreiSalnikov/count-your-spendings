import React from 'react';
import styles from './Operation.module.scss'

interface IOperation {
    sum: number,
    operationName: string,
    date: string,
    category: string
}

interface IOperationProps {
    operation: IOperation
}


const Operation: React.FC<IOperationProps> = ({operation}) => {

    return (
        <div className={styles.operation}>
            <p className={styles.operation__text}>{operation.sum}р</p>
            <p className={styles.operation__text}>{operation.date}</p>
            <p className={styles.operation__text}>{operation.operationName}</p>
            <p className={styles.operation__text}>{operation.category}</p>
        </div>
    );
};

export default Operation;
