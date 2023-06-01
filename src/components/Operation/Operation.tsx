import React from 'react';
import styles from './Operation.module.scss'

interface IOperation {
    id: number,
    sum: number,
    operationName: string,
    date: Date,
    category: string
}

interface IOperationProps {
    operation: IOperation
}


const Operation: React.FC<IOperationProps> = ({operation}) => {
        const formattedDate = operation.date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return (
        <div className={styles.operation}>
            <p className={styles.operation__text}>{operation.sum}р</p>
            <p className={styles.operation__text}>{formattedDate}</p>
            <p className={styles.operation__text}>{operation.operationName}</p>
            <p className={styles.operation__text}>{operation.category}</p>
        </div>
    );
};

export default Operation;
