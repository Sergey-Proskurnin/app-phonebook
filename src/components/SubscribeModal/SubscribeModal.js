import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useOnClickOutside from 'hooks/useOnClickOutside';
import ButtonCloseModal from 'components/ButtonCloseModal';
import s from './SubscribeModal.module.css';

const modalRoot = document.querySelector('#modal-subscribe-root');

const SubscribeModal = ({ closeSubscribeModal, isOpen }) => {
  const ref = useRef();

  useOnClickOutside(ref, closeSubscribeModal);
  useEffect(() => {
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowY = 'visible';
    };
  });

  return createPortal(
    <div className={s.subscribeModalWrapper}>
      <div className={s.changeSubscribeForm} ref={ref}>
        <ButtonCloseModal
          style={{
            position: 'absolute',
            top: '1%',
            right: '1%',
          }}
          closeModal={closeSubscribeModal}
        />
      </div>
    </div>,
    modalRoot,
  );
};

export default SubscribeModal;

SubscribeModal.propTypes = {
  closeSubscribeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
