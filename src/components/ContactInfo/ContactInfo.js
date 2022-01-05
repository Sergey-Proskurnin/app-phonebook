import React, { useRef, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

import { getChangeContact, getVisibleContacts } from 'redux/contacts';
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

const useStylesArrow = makeStyles(theme => ({
  customHoverFocus: {
    '&:focus': { backgroundColor: 'transparent' },
  },
}));

const ContactInfo = ({ onCloseModal }) => {
  const { name, number, email, avatarContactURL, favorite } = useSelector(
    state => getChangeContact(state),
  );

  const contacts = useSelector(state => getVisibleContacts(state));
  const [nameContact, setNameContact] = useState(name);
  const [numberContact, setNumberContact] = useState(number);
  const [emailContact, setEmailContact] = useState(email);
  const [avatarContact, setAvatarContact] = useState(avatarContactURL || null);
  const [favoriteContact, setFavoriteContact] = useState(favorite);

  const classes = useStyles();
  const classesArrow = useStylesArrow();

  const { toggleModal } = useContext(contextProps);

  const nodeRef = useRef(null);

  const getNextContact = nextContact => {
    setNameContact(nextContact.name);
    setNumberContact(nextContact.number);
    setEmailContact(nextContact.email);
    setAvatarContact(nextContact.avatarContactURL);
    setFavoriteContact(nextContact.favorite);
  };

  const getCurrentIdContact = () => {
    const currentContact = contacts.find(el => el.name === nameContact);
    const idContact = contacts.indexOf(currentContact);
    return idContact;
  };
  const getContactOnTheRight = () => {
    const id = getCurrentIdContact();
    const nextContact =
      id < contacts.length - 1 ? contacts[id + 1] : contacts[id];
    getNextContact(nextContact);
  };

  const getContactOnTheLeft = () => {
    const id = getCurrentIdContact();
    const nextContact = id > 0 ? contacts[id - 1] : contacts[id];
    getNextContact(nextContact);
  };

  const nameCapitolize = nameContact
    ?.split(' ')
    .map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1)}`)
    .join(' ');

  const onCloseModalContactInfo = () => {
    onCloseModal();
    toggleModal();
  };

  const idContact = getCurrentIdContact();

  return (
    <Animation style={sAs} time={750} nodeRef={nodeRef}>
      <div ref={nodeRef} className={s.cardOverley}>
        <span className={s.closeIcon} onClick={onCloseModalContactInfo}>
          &#10006;
        </span>
        <div className={s.imgOverley}>
          {avatarContact ? (
            <img src={avatarContact} alt="Contact's Avatar" />
          ) : (
            <p>{nameContact?.slice(0, 1).toUpperCase()}</p>
          )}
          {favoriteContact && (
            <Favorite
              className={s.favoriteIcon}
              style={{ color: '#e84a5f' }}
              fontSize="large"
            />
          )}
        </div>
        <p className={s.descriptionContact}>{nameCapitolize}</p>
        <p className={s.descriptionContact}>{numberContact}</p>
        <p className={s.descriptionContact}>{emailContact}</p>
        <div className={s.contactMailPhoneContainer}>
          <a href={`mailto:${emailContact}`}>
            <span className={s.span}>
              <ContactMailIcon
                className={classes.customHoverFocus}
                color="primary"
                style={{ fontSize: 60 }}
              />
            </span>
          </a>
          <a href={`tel:${numberContact}`}>
            <span className={s.span}>
              <ContactPhoneIcon
                className={classes.customHoverFocus}
                color="primary"
                style={{ fontSize: 60 }}
              />
            </span>
          </a>
        </div>
        <div className={s.buttonsArrow}>
          <div>
            {idContact !== 0 && (
              <IconButton
                className={classesArrow.customHoverFocus}
                onClick={getContactOnTheLeft}
                color="primary"
                aria-label="upload picture back contact information"
                component="div"
              >
                <ArrowBackIosIcon
                  style={{ fontSize: 65, paddingLeft: '15px' }}
                />
              </IconButton>
            )}
          </div>
          <div>
            {idContact !== contacts.length - 1 && (
              <IconButton
                className={classesArrow.customHoverFocus}
                onClick={getContactOnTheRight}
                color="primary"
                aria-label="upload picture forward contact information"
                component="div"
              >
                <ArrowForwardIosIcon
                  className={classesArrow.customHoverFocus}
                  style={{ fontSize: 65, paddingLeft: '15px' }}
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default ContactInfo;
ContactInfo.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
