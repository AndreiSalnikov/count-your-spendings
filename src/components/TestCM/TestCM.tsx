import React, { useState } from 'react';
import './FormStructor.scss';

interface IFormProps {
    isRegister: boolean,
    onToggleForm: (state: boolean) => void;
}

const FormStructor = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(true);

  // const handleToggleForm = () => {
  //   setIsRegisterForm(!isRegisterForm);
  // };

  return (
    <div className="form-structor">
        <Login onToggleForm={setIsRegisterForm} isRegister={isRegisterForm} />
        <Signup onToggleForm={setIsRegisterForm} isRegister={ isRegisterForm} />
    </div>
  );
};

const Signup: React.FC<IFormProps> = ({ onToggleForm,isRegister }) => {
  return (
    <form className={isRegister ? 'signup' : 'signup slide-up'} >
              <div className="form-title" onClick={()=>onToggleForm(!isRegister)}>
       Зарегистрируйтесь!
      </div>
      <div className={isRegister ? 'form-holder' : 'form-holder off'}>
        <input type="text" className="input" placeholder="Имя" />
        <input type="email" className="input" placeholder="Электронная почта" />
        <input type="password" className="input" placeholder="Пароль" />
      </div>
      <button className="submit-btn">Зарегистрироваться</button>

    </form>
  );
};

// @ts-ignore
const Login: React.FC<IFormProps> = ({ onToggleForm, isRegister }) => {
  return (
    <form className={isRegister ? 'login slide-up' : 'login'} >
      <div className="center">
        <h2 className="form-title" id="login" onClick={()=>onToggleForm(!isRegister)}>
            {isRegister && <span>или</span>}
            Войдите
        </h2>
        <div className="form-holder">
          <input type="email" className="input" placeholder="Электронная почта" />
          <input type="password" className="input" placeholder="Пароль" />
        </div>
        <button className="submit-btn">Войти</button>
      </div>
    </form>
  );
};

export default FormStructor;
