import React from 'react';
import styles from './Operations.module.scss'
import Operation from "../Operation/Operation";
import {useAppSelector} from "../../hooks/redux-hooks";


const Operations = () => {
    const spend = useAppSelector(state => state.spend);

    return (
        <div className={styles.operations}>
    {Object.entries(spend).map(([id, obj]) => (
      <Operation key={id} operation={obj} />
    ))}
        </div>
    );
};

export default Operations;
