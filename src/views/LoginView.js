import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { logIn } from 'redux/auth';
import LoginComponent from 'components/LoginComponent';
import alert from 'helpers/alert';

import sAl from 'helpers/animation/animationLeft.module.css';

import s from './Views.module.css';

const LoginView = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const onLogin = s => dispatch(logIn(s));

  const handleChange = ({ target: { name, value } }) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert('Please fill in all the fields! Enter your email and password!');
      return;
    }
    onLogin(state);
    setState(prev => ({
      ...prev,
      email: '',
      password: '',
    }));
  };
  const { email, password } = state;
  return (
    <div className={s.LoginContainer}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={250}
        classNames={sAl}
        unmountOnExit
      >
        <LoginComponent
          handleChange={handleChange}
          email={email}
          password={password}
          handleSubmit={handleSubmit}
        />
      </CSSTransition>
    </div>
  );
};
export default LoginView;
