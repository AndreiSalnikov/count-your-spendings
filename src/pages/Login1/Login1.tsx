import React from 'react';
import styles from './Login1.module.scss'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login1 = () => {
    return (
        <div className={styles.login}>
            <LoginForm/>
          </div>
    )
}

export default Login1;
