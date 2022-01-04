import React, { useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

import { getChangeContact } from 'redux/contacts';
import Animation from 'helpers/animation/Animation';
import contextProps from 'context/context';
import sAs from 'helpers/animation/animationScale.module.css';
import s from './ContactInfo.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { color: '#e84a5f' },
  },
}));

const ContactInfo = ({ onCloseModal }) => {
  const classes = useStyles();

  const { toggleModal } = useContext(contextProps);

  const nodeRef = useRef(null);

  const { name, number, email, avatarContactURL, favorite } = useSelector(
    state => getChangeContact(state),
  );
  const nameCapitolize = name
    ?.split(' ')
    .map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1)}`)
    .join(' ');

  const onCloseModalContactInfo = () => {
    onCloseModal();
    toggleModal();
  };

  return (
    <Animation style={sAs} time={750} nodeRef={nodeRef}>
      <div ref={nodeRef} className={s.cardOverley}>
        <span className={s.closeIcon} onClick={onCloseModalContactInfo}>
          &#10006;
        </span>
        <div className={s.imgOverley}>
          {avatarContactURL ? (
            <img src={avatarContactURL} alt="Contact's Avatar" />
          ) : (
            <p>{name?.slice(0, 1).toUpperCase()}</p>
          )}
          {favorite && (
            <Favorite
              className={s.favoriteIcon}
              style={{ color: '#e84a5f' }}
              fontSize="large"
            />
          )}
        </div>
        <p className={s.descriptionContact}>{nameCapitolize}</p>
        <p className={s.descriptionContact}>{number}</p>
        <p className={s.descriptionContact}>{email}</p>
        <div className={s.contactMailPhoneContainer}>
          <a href={`mailto:${email}`}>
            <span className={s.span}>
              <ContactMailIcon
                className={classes.customHoverFocus}
                color="primary"
                style={{ fontSize: 60 }}
              />
            </span>
          </a>
          <a href={`tel:${number}`}>
            <span className={s.span}>
              <ContactPhoneIcon
                className={classes.customHoverFocus}
                color="primary"
                style={{ fontSize: 60 }}
              />
            </span>
          </a>
        </div>
      </div>
    </Animation>
  );
};

export default ContactInfo;
ContactInfo.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
