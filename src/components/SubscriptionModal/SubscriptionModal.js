import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import useOnClickOutside from 'hooks/useOnClickOutside';
import ButtonCloseModal from 'components/ButtonCloseModal';
import SubscriptionRadioGroup from 'components/SubscriptionRadioGroup';
import { changeUserSubscription, getUserSubscription } from 'redux/auth';
import s from './SubscriptionModal.module.css';

const modalRoot = document.querySelector('#modal-subscribe-root');

const SubscriptionModal = ({ closeSubscriptionModal }) => {
  const subscription = useSelector(state => getUserSubscription(state));
  const ref = useRef();
  const [value, setValue] = useState(subscription);

  const dispatch = useDispatch();

  useOnClickOutside(ref, closeSubscriptionModal);
  useEffect(() => {
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowY = 'visible';
    };
  });
  const handleSubmit = e => {
    const subscription = { subscription: value };
    e.preventDefault();
    dispatch(changeUserSubscription(subscription));
    closeSubscriptionModal();
  };

  return createPortal(
    <div className={s.subscriptionModalWrapper}>
      <div className={s.changeSubscriptionForm} ref={ref}>
        <ButtonCloseModal
          style={{
            position: 'absolute',
            top: '1%',
            right: '1%',
          }}
          closeModal={closeSubscriptionModal}
        />
        <form onSubmit={handleSubmit}>
          <SubscriptionRadioGroup
            setValue={setValue}
            value={value}
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

export default SubscriptionModal;

SubscriptionModal.propTypes = {
  closeSubscriptionModal: PropTypes.func.isRequired,
};
