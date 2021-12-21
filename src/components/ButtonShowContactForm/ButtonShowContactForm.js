import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';

import s from './ButtonShowContactForm.module.css';
import { AddContactSvg, ContactsSvg } from 'components/MaterialSvgIcon';

const ButtonShowContactForm = ({
  contactsListRender,
  setContactsListRender,
}) => {
  const toggleContactForm = useCallback(() => {
    setContactsListRender(prevContactsListRender => !prevContactsListRender);
  }, [setContactsListRender]);

  return (
    <IconButton
      color="primary"
      aria-label="add to contact"
      className={s.ButtonShowContactForm}
      onClick={toggleContactForm}
    >
      {contactsListRender ? <AddContactSvg /> : <ContactsSvg />}
    </IconButton>
  );
};

export default ButtonShowContactForm;
