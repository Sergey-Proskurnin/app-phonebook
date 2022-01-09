import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PropTypes from 'prop-types';

import s from './ContactPhoneMailIcons.module.css';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': {
      color: '#e84a5f',
      backgroundColor: 'transparent',
    },
    '&:focus': { backgroundColor: 'transparent' },
  },
}));

const ContactPhoneMailIcons = ({ emailContact, numberContact }) => {
  const classes = useStyles();
  return (
    <div className={s.contactMailPhoneContainer}>
      <a href={`mailto:${emailContact}`} className={s.contactMailPhoneLink}>
        <span>
          <ContactMailIcon
            className={classes.customHoverFocus}
            color="primary"
            style={{ fontSize: 60 }}
          />
        </span>
      </a>
      <a href={`tel:${numberContact}`} className={s.contactMailPhoneLink}>
        <span>
          <ContactPhoneIcon
            className={classes.customHoverFocus}
            color="primary"
            style={{ fontSize: 60 }}
          />
        </span>
      </a>
    </div>
  );
};
export default ContactPhoneMailIcons;

ContactPhoneMailIcons.propTypes = {
  emailContact: PropTypes.string.isRequired,
  numberContact: PropTypes.string.isRequired,
};
