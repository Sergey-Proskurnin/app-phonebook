import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import s from './RegisterComponent.module.css';

const RegisterComponent = ({
  handleChange,
  name,
  email,
  password,
  passwordRepeat,
  handleSubmit,
}) => {
  return (
    <div className={s.RegisterSection}>
      <h1 className={s.RegisterTitle}>Registration</h1>
      <FormControl className={s.RegisterFormControl}>
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="For example 'John'"
          pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
          title="The name can only be from three to 30 letters, apostrophe, dash and spaces. For example Adrian, Jac Mercer, d'Artagnan, Александр Репета и т.п."
          required
          autoComplete="off"
          value={name}
          id="1"
          label="Enter your name"
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="For example 'email@gmail.com'"
          pattern="[A-Za-zА-Яа-яЁёЄєЇї0-9._%+-]+@[A-Za-zА-Яа-яЁёЄєЇї0-9.-]+\.[A-Za-zА-Яа-яЁёЄєЇї]{2,4}$"
          title="Email can consist of letters of numbers and a mandatory symbol '@'"
          required
          autoComplete="off"
          value={email}
          id="2"
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
          id="3"
          label="Enter your password"
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="password"
          name="passwordRepeat"
          pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
          title="The password can be at least six letters of numbers and symbols '!@#$%^&*'"
          required
          value={passwordRepeat}
          id="4"
          label="Enter your password again"
          variant="outlined"
        />
        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Сheck in
        </Button>
      </FormControl>
    </div>
  );
};

export default RegisterComponent;

RegisterComponent.propTypes = {
  handleChange: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  passwordRepeat: PropTypes.string,
  handleSubmit: PropTypes.func,
};
