import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import contextProps from 'context/context';
import s from './Modal.module.css';

const Modal = ({ children, onCloseModal }) => {
  const { toggleModal } = useContext(contextProps);

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseModal();
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
      onCloseModal();
      return toggleModal();
    }
  };

  return (
    <div onClick={closeModal} className={s.Overlay}>
      <div className={s.Modal}>{children}</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
