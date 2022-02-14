import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import s from './RepeatEmail.module.css';

import {
  repeatVerify,
  getUserEmail,
  getMessageRepeatEmailVerify,
} from 'redux/auth';
import alert from 'helpers/alert';

const RepeatEmail = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(getUserEmail);
  const messageSent = useSelector(getMessageRepeatEmailVerify);
  const { t } = useTranslation();
  useEffect(() => {
    messageSent && alert(messageSent);
  }, [messageSent]);

  const handleClick = () => {
    dispatch(repeatVerify({ email: userEmail }));
  };

  return (
    <>
      <p type="button" className={s.repeatedEmail} onClick={handleClick}>
        {`${t('registration.repeatEmail')} ${userEmail}`}
      </p>
    </>
  );
};

export default RepeatEmail;
