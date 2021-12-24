import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import contextProps from 'context/context';
import ContactFormChange from 'components/ContactFormChange';
import DeleteContact from 'components/DeleteContact';
import { contactChange, getChangeContact } from 'redux/contacts';
import Animation from 'helpers/animation/Animation';
import s from './Modal.module.css';
import sAl from 'helpers/animation/animationLeft.module.css';

const Modal = () => {
  const { change } = useSelector(state => getChangeContact(state));
  const dispatch = useDispatch();
  const { toggleModal } = useContext(contextProps);

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      toggleModal(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });
  const closeModal = e => {
    if (e.target.nodeName === 'DIV') {
      dispatch(contactChange({}));
      return toggleModal();
    }
  };

  return (
    <div onClick={closeModal} className={s.Overlay}>
      <div className={s.Modal}>
        <Animation style={sAl} time={250}>
          {change ? <ContactFormChange /> : <DeleteContact />}
        </Animation>
      </div>
    </div>
  );
};

export default Modal;
