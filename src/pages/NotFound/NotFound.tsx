import React from 'react';
import styles from './NotFound.module.scss'
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.notfound}>
      <h1 className={styles.notfound__code}>404</h1>
      <h2 className={styles.notfound__text}>Страница не найдена</h2>

      <div className={styles.notfound__back} onClick={() => navigate(-1)}>Назад</div>
    </main>
  );
};

export default NotFound;
