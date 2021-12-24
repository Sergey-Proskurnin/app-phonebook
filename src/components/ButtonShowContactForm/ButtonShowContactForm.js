import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';

import s from './ButtonShowContactForm.module.css';
import { AddContactSvg, ContactsSvg } from 'components/MaterialSvgIcon';
import PropTypes from 'prop-types';

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

ButtonShowContactForm.propTypes = {
  contactsListRender: PropTypes.bool.isRequired,
  setContactsListRender: PropTypes.func.isRequired,
};
