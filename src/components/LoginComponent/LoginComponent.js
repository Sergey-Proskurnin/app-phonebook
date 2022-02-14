import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import s from './LoginComponent.module.css';
import GoogleButtonWhite from 'components/GoogleButtonWhite';
import FacebookButton from 'components/FacebookButton';

const LoginComponent = ({
  nodeRef,
  handleChange,
  email,
  password,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <div ref={nodeRef} className={s.LoginSection}>
      <h1 className={s.LoginTitle}>{t('login.title')}</h1>
      <GoogleButtonWhite />
      <FacebookButton />
      <FormControl className={s.LoginFormControl}>
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="email"
          name="email"
          pattern="^[a-zA-Zа-яА-Я0-9_]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title={t('login.inputEmail.title')}
          required
          placeholder={t('login.inputEmail.placeholder')}
          autoComplete="off"
          value={email}
          color="secondary"
          id="1"
          label={t('login.inputEmail.label')}
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="password"
          name="password"
          pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
          title={t('login.inputPassword.title')}
          required
          placeholder={t('login.inputPassword.placeholder')}
          value={password}
          id="2"
          label={t('login.inputPassword.label')}
          variant="outlined"
        />
        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {t('login.button')}
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
  nodeRef: PropTypes.object.isRequired,
};
