import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

import s from './SubscribeModal.module.css';

const modalRoot = document.querySelector('#modal-subscribe-root');

const SubscribeModal = () => {
  return createPortal(
    <div className={s.subscribeModalWrapper}></div>,
    modalRoot,
  );
};

export default SubscribeModal;
