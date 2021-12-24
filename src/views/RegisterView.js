import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from 'redux/auth';
import RegisterComponent from 'components/RegisterComponent';
import alert from 'helpers/alert';
import OnLoader from 'components/OnLoader';
import { getLoading } from 'redux/contacts/contacts-selectors';
import Animation from 'helpers/animation/Animation';
import s from './Views.module.css';
import sAr from 'helpers/animation/animationRight.module.css';

const RegisterView = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };
  const nodeRef = useRef(null);
  const [state, setState] = useState(initialState);
  const isLoading = useSelector(getLoading);

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
      onRegister({ name, email, password }) &&
      setState(prev => ({
        ...prev,
        ...initialState,
      }))
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      return alert('Please fill in all fields for registration');
    }
    onPasswordVerification(state);

    // window.location.assign(routes.login);
    alert(
      `Congratulations, your email ${email} has been registered, an email has been sent to it to confirm your registration. Verify please!`,
    );
  };

  const { name, email, password, passwordRepeat } = state;
  return (
    <>
      <div className={s.RegisterContainer}>
        {isLoading ? (
          <OnLoader />
        ) : (
          <Animation style={sAr} time={500} nodeRef={nodeRef}>
            <RegisterComponent
              handleChange={handleChange}
              name={name}
              email={email}
              password={password}
              passwordRepeat={passwordRepeat}
              handleSubmit={handleSubmit}
              nodeRef={nodeRef}
            />
          </Animation>
        )}
      </div>
    </>
  );
};
export default RegisterView;
