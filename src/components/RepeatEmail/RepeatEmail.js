import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  useEffect(() => {
    messageSent && alert(messageSent);
  }, [messageSent]);

  const handleClick = () => {
    dispatch(repeatVerify({ email: userEmail }));
  };

  return (
    <>
      <p type="button" className={s.repeatedEmail} onClick={handleClick}>
        {`Send a follow-up email to ${userEmail}`}
      </p>
    </>
  );
};

export default RepeatEmail;
