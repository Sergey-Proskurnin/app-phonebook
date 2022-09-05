import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import useOnClickOutside from 'hooks/useOnClickOutside';
import ButtonCloseModal from 'components/ButtonCloseModal';
import SubscribeRadioGroup from 'components/SubscribeRadioGroup';
import s from './SubscribeModal.module.css';

const modalRoot = document.querySelector('#modal-subscribe-root');

const SubscribeModal = ({ closeSubscribeModal, isOpen }) => {
  const ref = useRef();
  const [value, setValue] = useState('starter');

  useOnClickOutside(ref, closeSubscribeModal);
  useEffect(() => {
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowY = 'visible';
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
    closeSubscribeModal();
  };

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
        <form onSubmit={handleSubmit}>
          <SubscribeRadioGroup
            setValue={setValue}
            style={{ marginLeft: '30px' }}
          />
          <Button
            type="submit"
            className={'s.button'}
            style={{
              paddingTop: '10px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
            variant="contained"
            color="primary"
          >
            Change
          </Button>
        </form>
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
