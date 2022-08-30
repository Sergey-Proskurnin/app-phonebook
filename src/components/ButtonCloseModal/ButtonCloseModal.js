import React from 'react';
import PropTypes from 'prop-types';

import s from './ButtonCloseModal.module.css';

const ButtonCloseModal = ({ style, closeModal }) => {
  return (
    <button
      type="button"
      style={style}
      className={s.closeButton}
      onClick={closeModal}
    >
      <span>&#10006;</span>
    </button>
  );
};

export default ButtonCloseModal;

ButtonCloseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  style: PropTypes.object,
};
