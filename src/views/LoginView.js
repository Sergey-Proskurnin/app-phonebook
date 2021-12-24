import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from 'redux/auth';
import LoginComponent from 'components/LoginComponent';
import alert from 'helpers/alert';
import OnLoader from 'components/OnLoader';
import { getLoading } from 'redux/contacts/contacts-selectors';
import Animation from 'helpers/animation/Animation';
import sAl from 'helpers/animation/animationLeft.module.css';
import s from './Views.module.css';

const LoginView = () => {
  const nodeRef = useRef(null);
  const initialState = {
    email: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const onLogin = s => dispatch(logIn(s));
  const isLoading = useSelector(getLoading);

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
      {isLoading ? (
        <OnLoader />
      ) : (
        <Animation style={sAl} time={250} nodeRef={nodeRef}>
          <LoginComponent
            handleChange={handleChange}
            email={email}
            password={password}
            handleSubmit={handleSubmit}
            nodeRef={nodeRef}
          />
        </Animation>
      )}
    </div>
  );
};
export default LoginView;
