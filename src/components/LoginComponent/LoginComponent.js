import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import s from './LoginComponent.module.css';
import GoogleButtonWhite from 'components/GoogleButtonWhite';
import FacebookButton from 'components/FacebookButton';

const LoginComponent = ({ handleChange, email, password, handleSubmit }) => {
  return (
    <div className={s.LoginSection}>
      <h1 className={s.LoginTitle}>Login</h1>
      <GoogleButtonWhite />
      <FacebookButton />
      <FormControl className={s.LoginFormControl}>
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="email"
          name="email"
          pattern="^[a-zA-Zа-яА-Я0-9_]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Email can consist of letters of numbers and a mandatory symbol '@'. For example user@example.com etc."
          required
          placeholder="For example 'email@gmail.com'"
          autoComplete="off"
          value={email}
          color="secondary"
          id="1"
          label="Enter your email"
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="password"
          name="password"
          pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
          title="The password can be at least six letters of numbers and symbols '!@#$%^&*'"
          required
          value={password}
          id="2"
          label="Enter your password"
          variant="outlined"
        />
        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </FormControl>
    </div>
  );
};

export default LoginComponent;

LoginComponent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
