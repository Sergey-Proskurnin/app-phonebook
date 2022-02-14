import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import s from './RegisterComponent.module.css';
import RepeatEmail from 'components/RepeatEmail';

import { getUserEmail } from 'redux/auth';

const RegisterComponent = ({
  nodeRef,
  handleChange,
  name,
  email,
  password,
  passwordRepeat,
  handleSubmit,
}) => {
  const userEmail = useSelector(getUserEmail);
  const { t } = useTranslation();
  return (
    <div ref={nodeRef} className={s.RegisterSection}>
      <h1 className={s.RegisterTitle}>{t('registration.title')}</h1>
      <FormControl className={s.RegisterFormControl}>
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder={t('registration.inputName.placeholder')}
          pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
          title={t('registration.inputName.title')}
          required
          autoComplete="off"
          value={name}
          id="1"
          label={t('registration.inputName.label')}
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder={t('registration.inputEmail.placeholder')}
          pattern="[A-Za-zА-Яа-яЁёЄєЇї0-9._%+-]+@[A-Za-zА-Яа-яЁёЄєЇї0-9.-]+\.[A-Za-zА-Яа-яЁёЄєЇї]{2,4}$"
          title={t('registration.inputEmail.title')}
          required
          autoComplete="off"
          value={email}
          id="2"
          label={t('registration.inputEmail.label')}
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder={t('registration.inputPassword.placeholder')}
          pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
          title={t('registration.inputPassword.title')}
          required
          value={password}
          id="3"
          label={t('registration.inputPassword.label')}
          variant="outlined"
        />
        <TextField
          style={{ marginTop: '20px' }}
          onChange={handleChange}
          type="password"
          name="passwordRepeat"
          placeholder={t('registration.inputName.placeholder')}
          pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
          title={t('registration.inputPassword1.title')}
          required
          value={passwordRepeat}
          id="4"
          label={t('registration.inputPassword1.label')}
          variant="outlined"
        />
        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {t('registration.button')}
        </Button>
      </FormControl>
      {userEmail && <RepeatEmail />}
    </div>
  );
};

export default RegisterComponent;

RegisterComponent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  nodeRef: PropTypes.object.isRequired,
};
