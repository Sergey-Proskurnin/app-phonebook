import React, { useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';

import { getChangeContact } from 'redux/contacts';
import Animation from 'helpers/animation/Animation';
import contextProps from 'context/context';
import sAs from 'helpers/animation/animationScale.module.css';
import s from './ContactInfo.module.css';

const ContactInfo = ({ onCloseModal }) => {
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
      </div>
    </Animation>
  );
};

export default ContactInfo;
ContactInfo.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
