import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { register } from 'redux/auth';
import RegisterComponent from 'components/RegisterComponent';
import alert from 'helpers/alert';

import s from './Views.module.css';
import sAr from 'helpers/animation/animationRight.module.css';

const RegisterView = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };

  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const onRegister = s => dispatch(register(s));

  const handleChange = ({ target: { name, value } }) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onPasswordVerification = state => {
    const { password, passwordRepeat, name, email } = state;
    if (
      password === '' ||
      passwordRepeat === '' ||
      name === '' ||
      email === ''
    ) {
      alert('Please fill in all fields marked with *!');
      return;
    }
    if (password !== passwordRepeat) {
      alert('Passwords do not match, please try again!');
      return setState(prev => ({
        ...prev,
        password: '',
        passwordRepeat: '',
      }));
    }
    return (
      onRegister(state) &&
      setState(prev => ({
        ...prev,
        ...initialState,
      }))
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    onPasswordVerification(state);
  };

  const { name, email, password, passwordRepeat } = state;
  return (
    <div className={s.RegisterContainer}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={sAr}
        unmountOnExit
      >
        <RegisterComponent
          handleChange={handleChange}
          name={name}
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          handleSubmit={handleSubmit}
        />
      </CSSTransition>
    </div>
  );
};
export default RegisterView;
